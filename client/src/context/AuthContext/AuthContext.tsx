import { ReactNode, createContext, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
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
  const [user, setUser] = useState<User | null>(initialValue.user);

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
