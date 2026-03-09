import { useState, useRef, useCallback } from "react";
import SettingsLayout from "../../components/SettingsLayout";
import {
  Shield,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Info,
  Camera,
  CreditCard,
  Car,
  User,
  X,
  AlertCircle,
} from "lucide-react";

const mockUser = {
  verificationStatus: "not_verified", // not_verified | pending | verified
};

const idTypes = [
  { value: "voters_card", label: "Voter's Card", icon: CreditCard },
  { value: "drivers_license", label: "Driver's License", icon: Car },
  { value: "nin", label: "NIN (National ID)", icon: User },
  { value: "passport", label: "International Passport", icon: FileText },
];

const Verification = () => {
  const [selectedIdType, setSelectedIdType] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const idFileInputRef = useRef(null);
  const photoFileInputRef = useRef(null);

  const handleFileChange = useCallback((e, setFile) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  }, []);

  const removeFile = (setFile, inputRef) => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const isFormValid = selectedIdType && idFile && photoFile;

  const getVerificationBadge = () => {
    if (mockUser.verificationStatus === "verified") {
      return (
        <span className="badge badge-success gap-1">
          <CheckCircle size={12} /> Verified
        </span>
      );
    }
    if (mockUser.verificationStatus === "pending") {
      return (
        <span className="badge badge-warning gap-1">
          <Clock size={12} /> Pending
        </span>
      );
    }
    return (
      <span className="badge badge-outline bg-red-500/10 text-red-500 px-1 gap-1">
        <XCircle size={12} /> Not verified
      </span>
    );
  };

  return (
    <SettingsLayout
      title="Identity Verification"
      description="Verify your identity to unlock full platform features"
    >
      <div className="space-y-8">
        {/* STATUS */}
        <div className="flex items-center justify-between p-4 rounded-xl border bg-base-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Shield className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="font-medium">Verification status</p>
              <p className="text-sm text-gray-500">Current account state</p>
            </div>
          </div>
          {getVerificationBadge()}
        </div>

        {/* INFO */}
        {mockUser.verificationStatus === "not_verified" && (
          <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex gap-3">
              <Info className="text-blue-500 mt-1" size={18} />
              <div className="space-y-1 text-sm text-gray-600">
                 <p className="font-medium text-black">How verification works</p>
                 <ul className="text-sm text-gray-500 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">1</span>
                    Select your ID type and upload a clear photo of the document
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">2</span>
                    Upload a recent photo of yourself that matches your ID
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">3</span>
                    Submit for review approval takes 1-2 business days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        <div className="space-y-3">
          <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold shadow-sm">
                  1
                </span>
                <div>
  <h3 className="text-base font-semibold">
  Select ID Type
</h3>
<p className="text-sm opacity-70">
  Choose the type of government-issued ID you'll provide
</p>

                </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {idTypes.map((type) => {
              const Icon = type.icon;
              const active = selectedIdType === type.value;

              return (
                <label
                  key={type.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
                    ${active ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"}
                  `}
                >
                  <input
                    type="radio"
                    className="hidden"
                    value={type.value}
                    checked={active}
                    onChange={() => setSelectedIdType(type.value)}
                  />
                  <div className={`p-2 rounded-lg ${active ? "bg-primary/10" : "bg-gray-100"}`}>
                    <Icon size={20} className={active ? "text-primary" : "text-gray-500"} />
                  </div>
                  <span className="font-medium">{type.label}</span>
                  {active && <CheckCircle size={18} className="ml-auto text-primary" />}
                </label>
              );
            })}
          </div>
        </div>

        {/* STEP 2 */}
        <div className={`space-y-4 ${!selectedIdType && "opacity-40 pointer-events-none"}`}>
          <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold shadow-sm">
                  2
                </span>
                <div>
  <h3 className="text-base font-semibold">
 Upload Voter's Card
</h3>
<p className="text-sm opacity-70">
  Make sure your ID is valid and clearly visible
</p>

                </div>

          {!idFile ? (
            <div
              onClick={() => idFileInputRef.current.click()}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5"
            >
              <Upload className="mx-auto text-gray-400 mb-3" />
              <p className="font-medium">Upload ID</p>
              <p className="text-sm text-gray-500">PNG, JPG or PDF</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-base-100">
              {idFile.file.type.startsWith("image") ? (
                <img src={idFile.preview} className="w-20 h-20 rounded-lg object-cover" />
              ) : (
                <FileText size={40} className="text-primary" />
              )}
              <div className="flex-1">
                <p className="font-medium truncate">{idFile.file.name}</p>
                <p className="text-sm text-gray-500">
                  {(idFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => removeFile(setIdFile, idFileInputRef)}
                className="btn btn-ghost btn-sm"
              >
                <X />
              </button>
            </div>
          )}

          <input
            ref={idFileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, setIdFile)}
          />
        </div>

        {/* STEP 3 */}
        <div className={`space-y-4 ${!idFile && "opacity-40 pointer-events-none"}`}>
            <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-semibold shadow-sm">
                  3
                </span>
                            <div>
            <h3 className="text-base font-semibold">
            Upload Your Photo
            </h3>
            <p className="text-sm opacity-70">
            Make sure your ID is valid and clearly visible
            </p>

                            </div>

          {!photoFile ? (
            <div
              onClick={() => photoFileInputRef.current.click()}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5"
            >
              <Camera className="mx-auto text-gray-400 mb-3" />
              <p className="font-medium">Upload selfie</p>
              <p className="text-sm text-gray-500">Clear face, no filters</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 rounded-xl border bg-base-100">
              <img src={photoFile.preview} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium truncate">{photoFile.file.name}</p>
                <p className="text-sm text-gray-500">
                  {(photoFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => removeFile(setPhotoFile, photoFileInputRef)}
                className="btn btn-ghost btn-sm"
              >
                <X />
              </button>
            </div>
          )}

          <input
            ref={photoFileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e, setPhotoFile)}
          />
        </div>

        {/* SUBMIT */}
        <div className="pt-6 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Shield size={16} /> Your documents are encrypted and stored securely
          </p>
          <button
            disabled={!isFormValid}
            className="btn btn-primary px-8 disabled:opacity-50"
          >
            Submit verification
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default Verification;
