import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Wrench,
  Building2,
  Info,
} from "lucide-react";

const listingOptions = [
  {
    id: "house",
    title: "Property / House",
    description: "List apartments, houses, rooms, or any rental property",
    icon: Building2,
    route: "/list/property",
    allowedRoles: ["agent"],
  },
  {
    id: "service",
    title: "Service",
    description: "Offer cleaning, repairs, moving, or other home services",
    icon: Wrench,
    route: "/list/service",
    allowedRoles: ["user"],
  },
  {
    id: "roommate",
    title: "Find a Roommate",
    description: "Create a profile to find compatible roommates",
    icon: Users,
    route: "/list/roommate",
    allowedRoles: ["agent", "user"],
  },
];

const ListYourSpaceModal = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const filteredOptions = selectedRole
    ? listingOptions.filter((o) =>
        o.allowedRoles.includes(selectedRole)
      )
    : [];

  const handleOptionClick = (option) => {
    onOpenChange(false);
    navigate(option.route);
  };

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
  {/* Backdrop click closes modal */}
  <form method="dialog" className="modal-backdrop">
    <button onClick={() => onOpenChange(false)}>close</button>
  </form>

  <div className="modal-box p-0 max-w-md relative">
    {/* CLOSE (X) md */}
    <button
      className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
      onClick={() => onOpenChange(false)}
    >
      ✕
    </button>

    {/* HEADER */}
    <div className="px-5 py-6 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
      <h3 className="text-xl font-bold">
        {selectedRole
          ? "What would you like to list?"
          : "Welcome to Elomaze"}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {selectedRole
          ? "Choose the type of listing you want to create"
          : "First, tell us about yourself"}
      </p>
    </div>

    {/* BODY */}
    <div className="px-5 py-5 space-y-4">
      {/* ROLE SELECTION */}
      {!selectedRole && (
        <>
          <p className="text-xs text-gray-500 text-center mb-3">
            Select your role to see available listing options
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedRole("agent")}
              className="w-full flex items-center gap-4 p-3 rounded-xl border hover:border-primary hover:bg-primary/5 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">I'm an Agent</p>
                <p className="text-xs text-gray-500">
                  List properties & roommates
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole("user")}
              className="w-full flex items-center gap-4 p-3 rounded-xl border hover:border-primary hover:bg-primary/5 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Home className="text-secondary" />
              </div>
              <div className="text-left">
                <p className="font-semibold">I'm a User</p>
                <p className="text-xs text-gray-500">
                  Offer services or roommates
                </p>
              </div>
            </button>
          </div>

          <div className="flex gap-2 p-3 mt-4 rounded-lg bg-base-200 text-xs text-gray-600">
            <Info size={14} />
            Agents list properties. Users list services. Both can find roommates.
          </div>
        </>
      )}

      {/* LISTING OPTIONS */}
      {selectedRole && (
        <>
          <div className="space-y-3">
            {filteredOptions.map((option) => {
              const Icon = option.icon;
              const active = hoveredOption === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl border transition
                    ${
                      active
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:border-primary/40"
                    }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition
                      ${
                        active
                          ? "bg-primary text-white scale-105"
                          : "bg-base-200 text-gray-500"
                      }`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="text-left flex-1">
                    <p
                      className={`font-semibold ${
                        active ? "text-primary" : ""
                      }`}
                    >
                      {option.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {option.description}
                    </p>
                  </div>

                  {active && <span className="text-primary text-lg">→</span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setSelectedRole(null)}
            className="btn btn-ghost btn-sm w-full mt-3"
          >
            ← Back
          </button>
        </>
      )}
    </div>
  </div>
</dialog>

  );
};

export default ListYourSpaceModal;
