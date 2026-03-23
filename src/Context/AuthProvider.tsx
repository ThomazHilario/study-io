import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type AuthContextProps = {
  loged: boolean | null;
  setLoged: Dispatch<React.SetStateAction<null | boolean>>;
};

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loged, setLoged] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider value={{ loged, setLoged }}>
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
