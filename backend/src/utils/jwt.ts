import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload
  extends JwtPayload {
  userId: number;
}

export const generateToken = (
  userId: number
): string => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );
};

export const verifyToken = (
  token: string
): CustomJwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as CustomJwtPayload;
};