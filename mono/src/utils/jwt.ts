import jwt from "jsonwebtoken";
import config from "../config/config";

interface Token {
  id: string;
  mail: string;
  exp: number;
  iat: number;
}

export const generateToken = (
  mail: string | undefined,
  id: string | undefined
) => {
  const newToken = jwt.sign(
    {
      id,
      mail,
      exp: Date.now() + 3600000,
    },
    config.SECRET_JWT_AUTH
  );

  return newToken;
};

export const verifyToken = (token: string ): { id: string; mail: string } | null => {
  const verifiedtoken = jwt.verify(token, config.SECRET_JWT_AUTH) as Token ;
  const limit = verifiedtoken.exp - 1200000;
  if (verifiedtoken.exp !== undefined && verifiedtoken.exp < Date.now()) {
    throw new Error("Token expirado");
  }
  if (Date.now() < limit) return null;
  return { id: verifiedtoken.id, mail: verifiedtoken.mail };
};

export const refreshToken = (token: any): any => {
    const response = verifyToken(token);
    if (response != null) {
      const newToken = generateToken(response?.id, response?.mail);
      return newToken
  }
};
