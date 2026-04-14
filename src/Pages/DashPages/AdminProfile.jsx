import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogOutIcon, Pencil, X } from "lucide-react";

const AdminProfile = ({ onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed ❌");
    }
  };

  const getFirstLetter = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    document.title = "Bravima || Admin Profile"
  }, [])
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">

      {/* Modal Box */}
      <div className="bg-white w-[400px] rounded-xl shadow-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Admin Profile</h2>

        <div className="border rounded-xl p-3 text-sm">
          <div className="flex items-center justify-between gap-3">

            {/* Left Section */}
            <div className="flex items-center gap-3 min-w-0">

              {/* Avatar */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-primary font-medium shrink-0">
                {getFirstLetter(user?.fullName || user?.name || user?.email)}
              </div>

              {/* User Info */}
              <div className="flex flex-col min-w-0">
                <span className="font-medium truncate">
                  {user?.fullName || user?.name || "Unknown User"}
                </span>
                <span className="text-xs text-muted-foreground capitalize truncate">
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              className="p-2 rounded-lg transition-colors shrink-0 cursor-pointer bg-red-500 text-white hover:bg-white hover:border-red-500 hover:border hover:text-red-500 hover:scale-100"
              aria-label="Edit user"
              onClick={handleLogout}
            >
              <LogOutIcon size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;