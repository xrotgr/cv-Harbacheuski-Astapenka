export type AuthInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  user: {
    id: string;
    email: string;
  };
  access_token: string;
};
