import { useState } from "react";
import SettingsLayout from "../../components/SettingsLayout";
import {
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <SettingsLayout
      title="Security"
      description="Manage your password and security settings"
    >
      <div className="space-y-8">

        {/* CHANGE PASSWORD */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Change Password
          </h4>

          <div className="grid gap-4 max-w-md">
            {/* Current Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Current Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full pr-10 focus:border-primary focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  New Password
                </span>
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full pr-10 focus:border-primary focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Confirm New Password
                </span>
              </label>

              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="input input-bordered w-full focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <button className="btn btn-outline border-gray-200 py-2 mt-2">
            Update Password
          </button>
        </div>

        {/* <div className="divider" /> */}

        {/* TWO-FACTOR AUTH */}
        {/* <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Two-Factor Authentication
            </p>
            <p className="text-xs text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>

          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={twoFactorEnabled}
            onChange={(e) => setTwoFactorEnabled(e.target.checked)}
          />
        </div> */}

        <div className="divider" />

        {/* DEACTIVATE ACCOUNT */}
        <div className="p-4 rounded-xl border border-red-200 bg-red-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-3">
              <AlertTriangle className="text-red-500 mt-0.5" size={18} />
              <div>
                <p className="font-medium text-gray-900">
                  Deactivate Account
                </p>
                <p className="text-sm text-gray-600">
                  This will disable your account and hide your profile
                </p>
              </div>
            </div>

            <button className="btn btn-error text-white btn-sm">
              Deactivate
            </button>
          </div>
        </div>

      </div>
    </SettingsLayout>
  );
};

export default Security;
