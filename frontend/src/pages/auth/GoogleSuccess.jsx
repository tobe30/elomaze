import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const applyPendingRole = async () => {
      const pendingRole = localStorage.getItem("pendingRole");

      if (pendingRole === "agent") {
        try {
          await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/user/update-role`,
            { role: "agent" },
            { withCredentials: true }
          );
        } catch (err) {
          console.error("Role update failed", err);
        }
      }

      localStorage.removeItem("pendingRole");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/profile");
    };

    applyPendingRole();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default GoogleSuccess;