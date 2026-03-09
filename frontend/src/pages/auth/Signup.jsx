import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, User, Eye, EyeOff, Check, ArrowRight } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    if (selectedRole) setStep(2);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Minimum 8 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!agreedToTerms) newErrors.terms = "Accept terms to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="pt-8 pb-4 text-center">
            <img
  src="/Elomaze-logo3.png"
  alt="Elomaze"
  className="h-14 sm:h-16 mx-auto mb-3"
 />

            <p className="text-sm text-gray-500">
              {step === 1 ? "Choose how you'll use Elomaze" : "Create your account"}
            </p>
          </div>

          {/* Progress */}
          <div className="flex justify-center gap-2 pb-6">
            <div className={`h-1 rounded-full ${step >= 1 ? "bg-primary w-10" : "bg-gray-300 w-4"}`} />
            <div className={`h-1 rounded-full ${step >= 2 ? "bg-primary w-10" : "bg-gray-300 w-4"}`} />
          </div>

          <div className="px-6 pb-8 sm:px-8">
            {step === 1 && (
              <div className="space-y-3">
                {["agent", "seller"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition
                      ${selectedRole === role
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                        ${selectedRole === role ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                        {role === "agent" ? <Building2 /> : <User />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {role === "agent" ? "I'm an Agent" : "I'm a User"}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {role === "agent"
                            ? "List properties"
                            : "user rent, services, and more"}
                        </p>
                      </div>
                      {selectedRole === role && (
                        <Check className="text-primary" />
                      )}
                    </div>
                  </button>
                ))}

                <button
                  onClick={handleContinue}
                  disabled={!selectedRole}
                  className={`w-full h-12 rounded-xl mt-4 font-semibold flex items-center justify-center gap-2
                    ${selectedRole
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-400"}`}
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            )}
            

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Continue with Google */}
<button
  type="button"
  className="w-full h-12 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition font-medium"
  onClick={() => {
    console.log("Continue with Google");
    // later: trigger Google OAuth
  }}
>
   <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
  Continue with Google
</button>

{/* Divider */}
<div className="flex items-center gap-3">
  <div className="flex-1 h-px bg-gray-200" />
  <span className="text-xs text-gray-400">or continue with email</span>
  <div className="flex-1 h-px bg-gray-200" />
</div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  ← Back
                </button>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full pr-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {/* Confirm */}
                <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
                                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                

                {/* Terms */}
                <label className="flex items-start gap-3 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  I agree to the{" "}
                  <a href="/terms" className="text-primary">Terms</a> and{" "}
                  <a href="/privacy" className="text-primary">Privacy Policy</a>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-primary text-white rounded-xl font-semibold"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-500 pt-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary font-medium">Login</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
