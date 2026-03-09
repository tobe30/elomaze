import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-8 text-center">
            <img
                    src="/Elomaze-logo3.png"
                    alt="Elomaze"
                    className="h-14 sm:h-16 mx-auto mb-3"
 />
            {!isSubmitted ? (
              <p className="text-gray-500">Enter your email to reset your password</p>
            ) : (
              <p className="text-gray-500">Password reset email sent</p>
            )}
          </div>

          {/* Content */}
          <div className="px-8 pb-10">
            {!isSubmitted ? (
              <div className="animate-fade-in">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 pl-1">
                      Email Address
                    </label>
                    <div
                      className={`relative rounded-2xl transition-all duration-300 ${
                        focusedField === "email" ? "ring-2 ring-blue-200" : ""
                      }`}
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-5 rounded-2xl border-2 bg-white text-gray-700 text-base placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                          error
                            ? "border-red-500"
                            : focusedField === "email"
                            ? "border-primary shadow"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      />
                    </div>
                    {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
                  </div>

                  {/* Send Reset Link Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 mt-4 bg-primary text-white font-semibold text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>

                {/* Back to Login Link */}
                <a
                  href="/login"
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mt-8 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Back to Login
                </a>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="flex flex-col items-center text-center">
                  {/* Success Icon */}
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Success Message */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <p className="text-gray-700 font-medium mb-2">
                      Check your email for the password reset link.
                    </p>
                    <p className="text-sm text-gray-500">
                      We sent a reset link to <span className="font-medium text-gray-700">{email}</span>. 
                      If you don't see it, check your spam folder.
                    </p>
                  </div>

                  {/* Resend Link */}
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                    }}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
                  >
                    Didn't receive the email? Try again
                  </button>

                  {/* Back to Login Link */}
                  <a
                    href="/login"
                    className="flex items-center justify-center gap-2 text-sm text-blue-600 font-medium hover:underline group"
                  >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Login
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6 px-4">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
