import { useQuery } from "@tanstack/react-query";
import { getDataUser } from "..";

export const useGetDataUser = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: () => getDataUser(),
  });
