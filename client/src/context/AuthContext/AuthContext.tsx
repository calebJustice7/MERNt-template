import { ReactNode, createContext, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  user: PartialUser | null;
  setUser: (user: PartialUser | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const initialValue = {
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: () => false,
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<PartialUser | null>(initialValue.user);

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
