import {
  useLocation,
  Navigate,
} from "react-router-dom";
import {useAuth} from "../context/auth";

const RequireAdminAuth = ({ children }) => {
  const auth = useAuth();
  console.log("auth is", auth);
  const location = useLocation();

  if (!auth.user || !auth.token || !auth.user.isAdmin                        ) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdminAuth;