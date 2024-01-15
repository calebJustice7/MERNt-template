import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { AppAbility, createAbility } from "../auth/ability";
import { IAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

interface AuthResponse {
  status: "authenticated" | "unauthenticated";
  user: UserWithRole | null;
}

export const AUTH_QUERY_KEY = ["auth"];
export const getAuth = async (): Promise<{
  status: IAuthContext["status"];
  user: IAuthContext["user"];
  ability: AppAbility;
}> => {
  try {
    const response = await api.get<AuthResponse>("/auth").then((res) => res.data);
    return {
      status: response.status,
      user: response.user,
      ability: createAbility(response.user?.full_role.permissions || []),
    };
  } catch (_err) {
    return { status: "error", user: null, ability: createAbility([]) };
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getAuth,
  });
};

export const useGetGoogleRedirect = (redirect: string | null) => {
  const getAuth = async (): Promise<string> => {
    return await api
      .get("/auth/google/generate-url", { params: { redirect: redirect || undefined } })
      .then((res) => res.data);
  };

  return useQuery({ queryKey: ["google-redirect-url"], queryFn: () => getAuth(), retry: 1 });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = (): Promise<void> => {
    return api.delete("/auth/logout");
  };

  return useMutation({
    mutationFn: logout,
    onSettled() {
      toast.success("Logged out");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
};
