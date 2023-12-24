import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useAuth = () => {
  const QUERY_KEY = ["auth"];
  const getAuth = async (): Promise<UserWithRole> => {
    return api.get("/auth").then((res) => res.data);
  };

  return useQuery({ queryKey: QUERY_KEY, queryFn: getAuth, retry: false });
};

export const useGetGoogleRedirect = (redirect: string | null) => {
  const getAuth = (): Promise<string> => {
    return api
      .get("/auth/google/generate-url", { params: { redirect: redirect || undefined } })
      .then((res) => res.data);
  };

  return useQuery({ queryKey: ["google-redirect-url"], queryFn: () => getAuth(), retry: 1 });
};

export const useLogout = () => {
  const logout = (): Promise<void> => {
    return api.delete("/auth/logout");
  };

  return useMutation({ mutationFn: logout });
};
