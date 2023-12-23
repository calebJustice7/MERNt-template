import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetUsers = () => {
  const getUsers = (): Promise<UserFull[]> => {
    return api.get("/users", { params: { where: { _id: { $exists: true } } } }).then((res) => res.data);
  };

  return useQuery({ queryKey: ["users"], queryFn: () => getUsers(), retry: 1 });
};
