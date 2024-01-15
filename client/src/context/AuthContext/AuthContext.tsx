import { ReactNode, createContext } from "react";
import { useAuth, useLogout } from "../../queries/Auth";

interface Props {
  children?: ReactNode;
}

export interface IAuthContext {
  status: "loading" | "unauthenticated" | "authenticated" | "error";
  user: UserWithRole | null;
  logout: () => void;
}

const initialValue = {
  status: "loading",
  user: null,
  logout: undefined!,
} as const;

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const query = useAuth();
  const logout = useLogout();

  const status = (() => {
    if (query.isLoading) return "loading";
    if (query.isError) return "error";
    if (query.isSuccess) return query.data.status;
    return "error";
  })();

  const user = query.isSuccess ? query.data.user : null;

  return <AuthContext.Provider value={{ status, user, logout: logout.mutate }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
