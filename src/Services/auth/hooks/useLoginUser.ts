import { useMutation } from "@tanstack/react-query";
import { loginUser } from "..";
import { toast } from "sonner";

export const useLoginUser = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Seja bem vindo!");
    },
    onError: () => {
      toast.error(
        "Não foi possível realizar o login da sua conta! Tente novamente em instantes.",
      );
    },
  });
