import { jwtVerify } from 'jose';

export const getDataFromToken = async (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      throw new Error('No token found');
    }
    const secret = process.env.JWT_SECRET;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const isUserVerified = async (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      throw new Error('No token found');
    }
    const secret = process.env.JWT_SECRET;

    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    if (payload.verified) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
};
