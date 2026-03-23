import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { verifyTokenUser } from "..";

type VerifyTokenResponse = Awaited<ReturnType<typeof verifyTokenUser>>;

export const useVerifyTokenUser = (
  options?: Omit<UseQueryOptions<VerifyTokenResponse>, "queryKey" | "queryFn">,
) =>
  useQuery({
    ...options,
    queryKey: ["token"],
    queryFn: () => verifyTokenUser(),
  });
