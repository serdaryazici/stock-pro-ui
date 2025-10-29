import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Header = ({ breadcrumbs, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "Kullanıcı";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("rememberMe");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="hidden md:block p-2 rounded-lg hover:bg-slate-100 text-xl text-slate-700 transition-colors"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <Breadcrumb items={breadcrumbs} />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-xl text-slate-600">
          <i className="fa-solid fa-bell"></i>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            0
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-semibold">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="text-slate-800 font-medium">
              {userEmail.split("@")[0]}
            </span>
            <i
              className={`fas fa-chevron-down text-xs text-slate-600 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            ></i>
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                <div className="px-4 py-2 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-800">
                    {userEmail.split("@")[0]}
                  </p>
                  <p className="text-xs text-slate-500">{userEmail}</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                  <i className="fas fa-user text-slate-500"></i>
                  Profil Ayarları
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                  <i className="fas fa-cog text-slate-500"></i>
                  Ayarlar
                </button>
                <div className="border-t border-slate-200 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
