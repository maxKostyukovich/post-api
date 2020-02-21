import jwt from 'jsonwebtoken';
import { JWT } from '../constants';
export const generateAccessToken = (id) => {
  const payload = {
      type: JWT.access.type,
      id,
  };
  const options = { expiresIn: JWT.access.expiresIn };
  return jwt.sign(payload, JWT.secretKey, options);
};

