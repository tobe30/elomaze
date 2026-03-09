import { useState, useRef } from "react";
import SettingsLayout from '../../components/SettingsLayout'

import {
  Camera,
  Upload,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  location: "Lagos, Nigeria",
  phone: "+234 801 234 5678",
  bio: "Real estate professional with 5+ years of experience in Lagos property market.",
  emailVerified: true,
};

const PersonalInfo = () => {
  const [personalForm, setPersonalForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    bio: mockUser.bio,
  });

  const fileInputRef = useRef(null);

  return (
    <SettingsLayout
      title="Personal Information"
      description="Make sure this matches the name on your government ID."
    >
      <div className="space-y-8">
        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
              {mockUser.avatar ? (
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xl font-semibold text-gray-500">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-2 rounded-full bg-neutral text-white shadow-md opacity-90 hover:opacity-100 transition"
            >
              <Camera size={14} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Profile photo
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
             A profile photo helps build trust with property owners and other users. Upload a clear, recent photo of yourself.
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-outline border-gray-200 btn-sm mt-4 gap-2"
            >
              <Upload size={16} />
              Change photo
            </button>
          </div>
        </div>

        <div className="divider" />

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full name</span>
            </label>
            <input
              value={personalForm.name}
              onChange={(e) =>
                setPersonalForm({ ...personalForm, name: e.target.value })
              }
              className="input input-bordered w-full
    border-gray-200
    hover:border-primary
    focus:border-primary
    focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label flex items-center gap-2">
              <span className="label-text font-medium">Email address</span>
              {mockUser.emailVerified && (
                <span className="badge bg-blue-500/20 text-blue-500  text-xs gap-1">
                  <CheckCircle size={12} />
                  Verified
                </span>
              )}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                value={personalForm.email}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, email: e.target.value })
                }
                className="input input-bordered w-full pl-10 hover:border-primary focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Phone number</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                value={personalForm.phone}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, phone: e.target.value })
                }
                className="input input-bordered w-full pl-10
                    border-gray-200
                    hover:border-primary
                    focus:border-primary
                    focus:outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                value={personalForm.location}
                onChange={(e) =>
                  setPersonalForm({ ...personalForm, location: e.target.value })
                }
                className="input input-bordered w-full pl-10
                        border-gray-200
                        hover:border-primary
                        focus:border-primary
                        focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="label">
            <span className="label-text font-medium">About you</span>
          </label>
          <textarea
            rows={4}
            value={personalForm.bio}
            onChange={(e) =>
              setPersonalForm({ ...personalForm, bio: e.target.value })
            }
            placeholder="Brief description about yourself"
            className="textarea textarea-bordered w-full resize-none
              border-gray-200
              hover:border-primary
              focus:border-primary
              focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            A good bio helps others know who you are. Keep it professional and friendly.
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button className="btn bg-primary text-white px-8">
            Save changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default PersonalInfo;
