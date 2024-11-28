import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const setUserCookie = (res: NextResponse, userId: string): void => {
  const token = jwt.sign({ userId }, 'yourSecretKey', { expiresIn: '30d' });
  cookies().set('userToken', token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 ימים
};
