import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetUsers = (query: FindQuery) => {
  const getUsers = (): Promise<UserFull[]> => {
    return api.get("/users", { params: query }).then((res) => res.data);
  };

  return useQuery({ queryKey: ["users"], queryFn: () => getUsers(), retry: 1 });
};
