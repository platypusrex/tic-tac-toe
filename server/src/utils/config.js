import dotenv from 'dotenv-safe';

dotenv.load();

export const secret = process.env.SECRET;
export const port = process.env.PORT || 4000;
export const database = process.env.DATABASE;
export const admin = process.env.ADMIN;
export const password = process.env.PASSWORD;