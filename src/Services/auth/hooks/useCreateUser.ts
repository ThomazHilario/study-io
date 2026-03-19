import { useMutation } from "@tanstack/react-query";
import { registerUser } from "..";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { setLocalStorage } from "@/utils";

export const useCreateUser = () =>
  useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      setLocalStorage("token", response.token);
      toast.success("Conta criada com sucesso!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
