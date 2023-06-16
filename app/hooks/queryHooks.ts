import { getUserByEmail, getUserById } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";

export const useGetUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["users", email],
    queryFn: () => email && getUserByEmail(email),
    enabled: !!email,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => id && getUserById(id),
    enabled: !!id,
  });
};
