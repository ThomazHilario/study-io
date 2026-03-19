export type RegisterUserProps = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserProps = {
  email: string;
  password: string;
};

export type GetDataUserProps = {
  token: string;
};

export type VerifyTokenUserProps = {
  token: string;
};

export type Token = {
  token: string;
};

export type RegisterUserResponse = Token;
export type LoginUserResponse = Token;
export type GetDataUserResponse = void;
export type VerifyTokenUserResponse = void;
