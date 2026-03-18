import {
  LoginUserProps,
  LoginUserResponse,
  RegisterUserProps,
  RegisterUserResponse,
} from ".";
import { Axios } from "@/utils";

export const registerUser = async ({
  ...payload
}: RegisterUserProps): Promise<RegisterUserResponse> => {
  const response = await Axios.post("/auth/register", {
    ...payload,
  });

  return response.data;
};

export const loginUser = async ({
  ...payload
}: LoginUserProps): Promise<LoginUserResponse> => {
  const response = await Axios.post("/auth/login", {
    ...payload,
  });

  return response.data;
};
