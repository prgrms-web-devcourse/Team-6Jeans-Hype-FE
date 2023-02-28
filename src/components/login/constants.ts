const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
const REDIRECT_URI = `${ORIGIN}/auth/callback/google`;

export const GOOGLE_LOGIN_REQUEST_URL = `${AUTH_API_URL}/google?redirect_uri=${REDIRECT_URI}`;
