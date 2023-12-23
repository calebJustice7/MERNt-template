import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  user: UserWithRole | null;
  setUser: (user: UserWithRole | null) => void;
  logout: () => void;
}

const initialValue = {
  user: null,
  setUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserWithRole | null>(initialValue.user);

  const logout = () => {
    if (user) {
      toast.error("Login session expired");
    }
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
