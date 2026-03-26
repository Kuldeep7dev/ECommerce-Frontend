import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
// import axiosInstance from "../../../Config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BellRing, Clock12 } from "lucide-react";
import axiosInstance from "../../Config/AxiosInstance";
import { timeAgo } from "../../Utils/time";

const Dashbar = () => {
  // const { user } = useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const fetchNoti = async () => {
    try {
      const res = await axiosInstance.get('/Notification');
      setData(res.data.notifications);
    } catch (error) {

    }
  }


  const handleClickOutside = async () => {
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }


  /* ================= Outside Click Handler ================= */
  useEffect(() => {
    handleClickOutside()
    fetchNoti()
  }, []);

  /* ================= Logout ================= */
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed ❌");
    }
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
              <div className="absolute right-0 mt-3 bg-white text-black shadow-lg rounded-xl p-3 w-80 z-50">

                {/* Header (ONLY ONCE) */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Notifications</p>
                  <span className="text-xs font-bold text-green-800 bg-green-200 px-2 py-1 rounded">
                    {data.length} New
                  </span>
                </div>

                <hr className="my-2" />

                {/* List */}
                <ul className="max-h-64 overflow-y-auto">
                  {data.map((item, idx) => (
                    <Link to={`/contact/${item._id}`} key={item._id || idx}>
                      <li
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer mb-2"
                      >
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                            {item.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          {/* <span className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow">
                          <Clock12 size={12} className="text-gray-500" />
                        </span> */}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-gray-800">
                              {item.name || "Unknown"}
                            </p>
                            <span title={item.createdAt} className="text-xs text-gray-400">{timeAgo(item.createdAt)}</span>
                          </div>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.message || "No message"}
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>

                <hr />

                <div className="flex justify-center items-center">
                  <Link
                    to="/contact"
                    className="text-xs cursor-pointer mt-2 underline underline-offset-2 p-3 hover:bg-black hover:text-white transition-all w-full text-center"
                  >
                    Read all message
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border border-primary h-9"></div>

          {/* ================= Profile ================= */}
          <div ref={profileRef} className="relative select-none">
            <div
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer p-1.5"
            >
              <div className="border p-2 rounded-full w-9 h-9 flex justify-center items-center">
                {/* {getFirstLetter(user?.fullName)} */}
              </div>

              <div>
                {/* <p className="text-xs tracking-wider">{user?.fullName}</p> */}
                <span className="text-[10px] tracking-wider capitalize">
                  {/* {user?.role} */}
                </span>
              </div>
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-white text-black shadow-lg rounded-lg p-3 w-40 flex flex-col gap-2 z-50">
                <Link
                  to="/profile"
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded border"
                >
                  Profile
                </Link>

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
    </div>
  );
};

export default Dashbar;
