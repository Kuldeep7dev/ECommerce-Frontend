import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../socket/SocketProvider";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BellRing, Clock12, Trash2, CheckCheck } from "lucide-react";
import axiosInstance from "../../Config/AxiosInstance";
import { timeAgo } from "../../Utils/time";
import AdminProfile from "../../Pages/DashPages/AdminProfile";

const Dashbar = () => {
  const { user, logout } = useAuth();
  const socket = useSocket();
  const [data, setData] = useState([]);
  const [adminProfileOpen, setAdminProfileOpen] = useState(false);
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const fetchNoti = async () => {
    try {
      if (!user?._id) return;
      const res = await axiosInstance.get(`/notifications/user/${user._id}`);
      setData(res.data.data || []);
    } catch (error) {
      console.log(error)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/read/${id}`);
      fetchNoti();
    } catch (error) {
       console.error("Failed to mark as read");
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put(`/notifications/read-all/${user._id}`);
       toast.success("All caught up! ✅");
      fetchNoti();
    } catch (error) {
       console.error("Failed to mark all as read");
    }
  }

  const handleDeleteNotification = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      toast.success("Notification deleted");
      fetchNoti();
    } catch (error) {
       console.error("Failed to delete");
    }
  }

  const unreadCount = data.filter(n => !n.isRead).length;


  const handleClickOutside = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setNotificationOpen(false);
    }
  }


  /* ================= Outside Click Handler ================= */
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    fetchNoti()
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user?._id]);

  /* ================= Socket Listener ================= */
  useEffect(() => {
    if (!socket) return;

    const handleReceiveNotification = (notification) => {
      console.log("New notification received via socket:", notification);
      setData((prev) => [notification, ...prev]);
      toast.success(`New ${notification.type || 'notification'}: ${notification.title}`, {
        icon: '🔔',
        duration: 5000,
      });
    };

    socket.on("receiveNotification", handleReceiveNotification);

    return () => {
      socket.off("receiveNotification", handleReceiveNotification);
    };
  }, [socket]);

  /* ================= Logout ================= */
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

  return (
    <div className="relative">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 flex justify-end bg-secondary text-primary p-3 rounded-xl items-center">

        <div className="flex items-center gap-3">
          {/* ================= Notification ================= */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setNotificationOpen((prev) => !prev)}
              className="cursor-pointer mt-2"
            >
              <BellRing />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black shadow-2xl rounded-2xl p-4 w-96 z-50 border border-gray-100 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-200">

                {/* Header (ONLY ONCE) */}
                <div className="flex items-center justify-between px-1 mb-3">
                  <p className="text-sm font-black text-secondary">System Updates</p>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${unreadCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                    {unreadCount} New
                  </span>
                </div>

                <hr className="mb-3 opacity-50" />

                {/* List */}
                {data.length === 0 ? (
                  <div className="py-10 text-center flex flex-col items-center opacity-40">
                     <Bell size={24} className="mb-2" />
                     <p className="text-[11px] font-medium">Your inbox is clear!</p>
                  </div>
                ) : (
                  <ul className="max-h-80 overflow-y-auto pr-1">
                    {data.map((item, idx) => (
                      <div key={item._id || idx} className="relative group flex items-center gap-2 mb-2">
                        <li
                          onClick={() => !item.isRead && handleMarkAsRead(item._id)}
                          className={`flex-1 flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${!item.isRead ? 'bg-blue-50/50 hover:bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                        >
                          {/* Avatar/Icon */}
                          <div className="relative">
                            <div className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-xs ${!item.isRead ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                              {item.type?.charAt(0) || "S"}
                            </div>
                            {!item.isRead && (
                               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className={`text-xs truncate ${!item.isRead ? 'font-bold text-secondary' : 'font-semibold text-gray-500'}`}>
                                {item.title || "No Title"}
                              </p>
                              <span title={item.createdAt} className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                                {timeAgo(item.createdAt)}
                              </span>
                            </div>

                            <p className="text-[10px] leading-relaxed text-gray-500 mt-0.5 line-clamp-2">
                              {item.message || "New activity detected."}
                            </p>
                          </div>
                        </li>

                        {/* Action Buttons (Visible on hover) */}
                        <div className="flex flex-col gap-1 opacity-10 md:group-hover:opacity-100 transition-opacity pr-1">
                           <button 
                             onClick={(e) => handleDeleteNotification(e, item._id)}
                             className="p-2 transition-colors hover:bg-red-50 hover:text-red-500 rounded-lg"
                             title="Delete"
                           >
                             <Trash2 size={12} />
                           </button>
                        </div>
                      </div>
                    ))}
                  </ul>
                )}

                <hr className="mt-3 opacity-50" />

                <div className="flex gap-2 mt-3 w-full">
                  <button 
                    onClick={handleMarkAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-[10px] font-bold flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl hover:bg-gray-100 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                  <Link
                    to="/contact"
                    className="text-[10px] font-bold flex-1 text-center py-2.5 px-3 rounded-xl bg-secondary text-primary hover:opacity-90 transition-all"
                  >
                    View Inbox
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border border-primary h-9"></div>

          {/* ================= Profile ================= */}
          <div ref={profileRef} className="relative select-none flex flex-col">
            <div
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer p-1.5"
            >
              <div className="border p-2 rounded-full w-9 h-9 flex justify-center items-center">
                {getFirstLetter(user?.fullName || user?.name || user?.email)}
              </div>

              <div>
                <p className="text-xs tracking-wider">{user?.fullName || user?.name}</p>
                <span className="text-[10px] tracking-wider capitalize">
                  {user?.role || "Admin"}
                </span>
              </div>
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black shadow-lg rounded-lg p-3 w-40 flex flex-col gap-2 z-50">
                <button
                  onClick={() => setAdminProfileOpen(prev => !prev)}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded border"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="cursor-pointer p-2 rounded bg-secondary text-primary font-semibold hover:opacity-90 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {adminProfileOpen && (
        <AdminProfile onClose={() => setAdminProfileOpen(false)} />
      )}
    </div>
  );
};

export default Dashbar;
