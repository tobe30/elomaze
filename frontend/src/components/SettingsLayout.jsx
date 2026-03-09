import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Lock,
  Shield,
  Bell,
  FileText,
  CreditCard,
  Globe,
  Briefcase,
  IdCard,
} from "lucide-react";

/* =======================
   Sections
======================= */
const sections = [
  { id: "personal", label: "Personal information", path: "/settings", icon: User },
  { id: "verification", label: "Verification", path: "/settings/verification", icon: IdCard },
  { id: "security", label: "Security", path: "/settings/security", icon: Lock },
  { id: "notifications", label: "Notifications", path: "/settings/notifications", icon: Bell },
  { id: "taxes", label: "Taxes", path: "/settings/taxes", icon: FileText },
  { id: "payments", label: "Payments", path: "/settings/payments", icon: CreditCard },
  { id: "language", label: "Languages & currency", path: "/settings/language", icon: Globe },
  { id: "travel", label: "Travel for work", path: "/settings/travel", icon: Briefcase },
];

const SettingsLayout = ({ children, title, description }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  /* =======================
     Sidebar Content
  ======================= */
  const Sidebar = ({ onNavigate }) => (
    <div className="h-full bg-white">
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Account settings
        </h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const active = isActive(section.path);

            return (
              <li key={section.id}>
                <button
                  onClick={() => onNavigate(section.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition
                    ${
                      active
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-800 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className="h-5 w-5 text-gray-700" />
                  <span>{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 lg:px-10 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block">
            <Sidebar onNavigate={navigate} />
          </aside>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <p className="text-xs text-gray-500">Account settings</p>
              <p className="font-medium text-gray-900 truncate">
                {sections.find((s) => isActive(s.path))?.label}
              </p>
            </div>
          </div>

          {/* Content */}
          <main>
            <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  {title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {description}
                </p>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[280px] bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <span className="font-medium text-gray-900">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <Sidebar onNavigate={handleNavigate} />
          </div>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SettingsLayout;
