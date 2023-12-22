import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useAuth = () => {
  const QUERY_KEY = ["auth"];
  const getAuth = async (): Promise<User> => {
    return api.get("/auth").then((res) => res.data);
  };

  return useQuery({ queryKey: QUERY_KEY, queryFn: getAuth, retry: false });
};

export const useGetGoogleRedirect = () => {
  const getAuth = (): Promise<string> => {
    return api.get("/auth/google/generate-url").then((res) => res.data);
  };

  return useQuery({ queryKey: ["google-redirect-ur,"], queryFn: () => getAuth(), retry: 1 });
};
