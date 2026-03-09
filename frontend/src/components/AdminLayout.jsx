import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Flag,
  CreditCard,
  MapPin,
  MessageSquare,
  Settings,
  Shield,
  Search,
  Bell,
  ChevronDown,
  Menu,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Agents & Users", icon: UserCheck, path: "/admin/agents" },
  { label: "Listings", icon: Building2, path: "/admin/listings" },
   { label: "Services", icon: Building2, path: "/admin/services" },
  { label: "Roommates", icon: Users, path: "/admin/roommates" },
  { label: "Reports", icon: Flag, path: "/admin/reports" },
  { label: "Payments & Revenue", icon: CreditCard, path: "/admin/payments" },
  { label: "Locations & Categories", icon: MapPin, path: "/admin/locations" },
  { label: "Community", icon: MessageSquare, path: "/admin/community" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "Admin Roles", icon: Shield, path: "/admin/roles" },
];

// mock admin
const admin = {
  name: "Super Admin",
  email: "admin@elomaze.com",
};

// mock notifications
const notifications = [
  {
    id: 1,
    title: "New report submitted",
    description: "A user reported a listing for fraud",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Agent verification pending",
    description: "3 agents awaiting document review",
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    title: "Revenue milestone reached",
    description: "Monthly revenue exceeded ₦5M",
    time: "1 hour ago",
    unread: false,
  },
];


const SidebarContent = ({ onItemClick }) => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-base-100">
      {/* Logo */}
<div className="flex h-16 items-center border-b px-6"> 
  <Link to="/admin" className="flex items-center">
    <img 
      src="/Elomaze-logo3.png" 
      alt="Elomaze Logo" 
      className="h-12 md:h-14 w-auto object-contain"
    />
  </Link>
</div>



      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/admin" &&
              location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content/70 hover:bg-base-200"
                }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-base-200 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold">Super Admin</p>
            <p className="text-[10px] opacity-60">Full access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-base-100 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="w-64 bg-base-100">
            <SidebarContent onItemClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-base-100 px-4">
          <button
            className="btn btn-ghost btn-sm lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
            <input
              className="input input-sm w-full pl-9"
              placeholder="Search users, listings, locations..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 relative">
            {/* Notifications */}
            {/* Notifications */}
<div className="relative">
  <button
    onClick={() => {
      setNotifOpen(!notifOpen);
      setProfileOpen(false);
    }}
    className="btn btn-ghost btn-sm relative"
  >
    <Bell className="h-4 w-4" />
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-error text-white text-[10px] flex items-center justify-center">
      5
    </span>
  </button>

{notifOpen && (
  <div className="absolute right-0 mt-3 w-[360px] rounded-xl bg-white shadow-xl border z-50">
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <h4 className="text-[13px] font-bold text-gray-800">
        Notifications
      </h4>
      <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">
        5 new
      </span>
    </div>

    {/* Notification list */}
    <div className="divide-y">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="px-4 py-3 cursor-pointer transition hover:bg-gray-50"
        >
          <p className="text-[13px] font-medium text-gray-900 leading-snug">
            {n.title}
          </p>
          <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">
            {n.description}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {n.time}
          </p>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="px-4 py-3 border-t text-center">
      <Link
        to="/admin/notifications"
        className="text-[12px] font-medium text-primary hover:underline"
        onClick={() => setNotifOpen(false)}
      >
        View all notifications
      </Link>
    </div>
  </div>
)}

</div>


            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="btn btn-ghost btn-sm gap-3 flex items-center"
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8">
                    <span className="text-xs">SA</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-xs font-semibold">{admin.name}</span>
                  <span className="text-[10px] opacity-60">
                    {admin.email}
                  </span>
                </div>

                <ChevronDown className="h-3 w-3 opacity-60" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-base-100 shadow-lg border z-50">
                  <ul className="menu p-2">
                    <li>
                      <a>
                        <Settings className="h-4 w-4" />
                        Settings
                      </a>
                    </li>
                    <li className="text-error">
                      <a>
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
