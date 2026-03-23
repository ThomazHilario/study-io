import { useAuth } from "@/Context/AuthProvider";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useVerifyTokenUser } from "@/Services/auth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loged, setLoged } = useAuth();
  const { data } = useVerifyTokenUser({
    refetchInterval: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setLoged(true);
      return;
    }

    return setLoged(false);
  }, [setLoged]);

  if (loged) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
