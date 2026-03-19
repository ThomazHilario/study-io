import { useMutation } from "@tanstack/react-query";
import { loginUser } from "..";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { setLocalStorage } from "@/utils";

export const useLoginUser = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      setLocalStorage("token", response.token);
      toast.success("Seja bem vindo!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
