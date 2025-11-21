import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-100 bg-white/70 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to={isAuthenticated ? "/app/trips" : "/"}
          className="flex items-center gap-2"
        >
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-400 flex items-center justify-center shadow-soft">
            <span className="text-white font-semibold text-sm">WL</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm">WanderLog</span>
            <span className="text-[11px] text-slate-500">Travel planner</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && !isAuthPage && (
            <>
              <span className="hidden sm:inline text-xs text-slate-600">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && !isAuthPage && (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-full bg-sky-500 text-xs font-medium text-white hover:bg-sky-600 shadow-soft"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
