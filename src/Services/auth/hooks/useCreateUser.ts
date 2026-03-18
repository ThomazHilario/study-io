import { useMutation } from "@tanstack/react-query";
import { registerUser } from "..";
import { toast } from "sonner";

export const useCreateUser = () =>
  useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: () => {
      toast.error(
        "Não foi possível criar sua conta! Tente novamente em instantes.",
      );
    },
  });
