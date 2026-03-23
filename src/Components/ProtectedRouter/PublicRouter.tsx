import { useAuth } from "@/Context/AuthProvider";
import { useVerifyTokenUser } from "@/Services/auth";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRouter = () => {
  const { loged, setLoged } = useAuth();
  const { data } = useVerifyTokenUser();

  useEffect(() => {
    if (data) {
      setLoged(true);
      return;
    }

    return setLoged(false);
  }, [data, setLoged]);

  if (loged) {
    return <Navigate to="/study" replace />;
  } else {
    return <Outlet />;
  }
};
