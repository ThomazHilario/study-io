import { useQuery } from "@tanstack/react-query";
import { verifyTokenUser } from "..";
import { getLocalStorage } from "@/utils";

export const useVerifyTokenUser = () =>
  useQuery({
    queryKey: ["token"],
    queryFn: () => verifyTokenUser(),
    refetchInterval: 1000 * 60,
    enabled: getLocalStorage("token") !== null,
  });
