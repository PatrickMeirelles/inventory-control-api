import { genSalt, hash, compare } from "bcryptjs";

const RANDOMS_SALT = 4;

const hashPassword = async (password: string) => {
  const saltGenerate = await genSalt(RANDOMS_SALT);
  return await hash(password, saltGenerate);
};

const verifyPassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
};

export const Crypto = {
  hashPassword,
  verifyPassword,
};