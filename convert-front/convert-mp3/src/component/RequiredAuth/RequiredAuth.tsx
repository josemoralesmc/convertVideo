import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

  
 const RequireAuth = () => {
  const token = Cookies.get("Token")
  if (!token) {
    return <Navigate to={'/'}/>;
  }

  return <Outlet/>;
};

export default RequireAuth