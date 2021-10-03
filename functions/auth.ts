import { Handler } from '@netlify/functions';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';

const EMAIL_SECRET = process.env.EMAIL_TOKEN;
const COOKIE_SECRET = process.env.COOKIE_TOKEN;

const safelyVerify = (token: string) => {
  try {
    return jwt.verify(token, EMAIL_SECRET);
  } catch (e) {
    return null;
  }
};

const handler: Handler = async (event, context) => {
  const { token } = event.queryStringParameters;

  const verified = await safelyVerify(token);

  if (!verified) {
    return Promise.resolve({
      statusCode: 302,
      headers: {
        Location: '/',
      },
    });
  }

  const { email } = verified as JwtPayload;

  const cookieToken = await jwt.sign({ email }, COOKIE_SECRET);

  return Promise.resolve({
    headers: {
      'set-cookie': cookie.serialize('babylon-token', cookieToken, {
        maxAge: 60 * 60 * 24 * 7 * 7, // 7 weeks
        httpOnly: true,
      }),
      Location: '/',
    },
    statusCode: 302,
  });
};

export { handler };
