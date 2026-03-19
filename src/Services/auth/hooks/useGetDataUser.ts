import { useQuery } from "@tanstack/react-query";
import { getDataUser } from "..";
import { getLocalStorage } from "@/utils";

export const useGetDataUser = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: () => getDataUser(),
    enabled: getLocalStorage("token") !== null,
  });
