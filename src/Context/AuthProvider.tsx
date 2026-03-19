import { useGetDataUser, useVerifyTokenUser } from "@/Services/auth";
import { getLocalStorage } from "@/utils";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const { data } = useGetDataUser();

  return (
    <AuthContext.Provider value={{ loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw "You dont use useAuth!";
  }

  return context;
};
