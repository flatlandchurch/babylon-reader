import { Handler, HandlerResponse } from '@netlify/functions';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const CLIENT_SECRET = process.env.COOKIE_TOKEN || '';

const safelyVerify = (token: string) => {
  try {
    return jwt.verify(token, CLIENT_SECRET);
  } catch (e) {
    return null;
  }
};

const handler: Handler = async (event, context) => {
  const { cookie: cookies } = event.headers;

  const response: HandlerResponse = {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };

  if (!cookies) {
    response.statusCode = 400;
  } else {
    const token = cookie.parse(cookies)['babylon-token'];
    if (safelyVerify(token)) {
      response.statusCode = 200;
    }
  }

  return Promise.resolve(response);
};

export { handler };
