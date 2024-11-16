import * as jwt from "jsonwebtoken";

interface IJWT {
  uid: number;
}

const sign = (data: IJWT): string | "JWT_SECRET_KEY_NOT_FOUND" => {
  if (!process.env.JWT_SECRET_KEY) return "JWT_SECRET_KEY_NOT_FOUND";

  return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

const verify = (
  token: string
): IJWT | "JWT_SECRET_KEY_NOT_FOUND" | "INVALID_TOKEN" => {
  if (!process.env.JWT_SECRET_KEY) return "JWT_SECRET_KEY_NOT_FOUND";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }

    return decoded as IJWT;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const tokenJwt = {
  sign,
  verify,
};