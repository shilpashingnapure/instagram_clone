import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./navbar";
export const PrivateRoute = () => {
  const location = useLocation();
  const isAuthenticated = Cookies.get("token");

  // handle where we have to show navbar 
  const noNavbarRoutes = ['/edit'];

  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname)

  return isAuthenticated ? (
    <>
      { shouldShowNavbar &&  <Navbar />} 
      <div className="w-[70%] mt-[60px] m-auto px-5 py-5 ">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
