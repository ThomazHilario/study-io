import {
  GetDataUserResponse,
  LoginUserProps,
  LoginUserResponse,
  RegisterUserProps,
  RegisterUserResponse,
} from ".";
import { Axios, getLocalStorage } from "@/utils";

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

export const getDataUser = async (): Promise<GetDataUserResponse> => {
  const token = getLocalStorage("token") || "";

  const response = await Axios.get("/auth/getData", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const verifyTokenUser = async (): Promise<boolean> => {
  const token = getLocalStorage("token") || "";

  const response = await Axios.get("/auth/onAuth", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
