import jwt, { JwtPayload } from 'jsonwebtoken';
import { Handler, HandlerResponse } from '@netlify/functions';
import cookie from 'cookie';
import fauna from 'faunadb';

const COOKIE_TOKEN = process.env.COOKIE_TOKEN;
const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_KEY || '' });

const safelyVerify = (token: string) => {
  try {
    return jwt.verify(token, COOKIE_TOKEN);
  } catch (e) {
    return null;
  }
};

const handler: Handler = async (event, context) => {
  const { cookie: cookies } = event.headers;
  const { day, read } = JSON.parse(event.body);

  const response: HandlerResponse = {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };

  if (!cookies) {
    return Promise.resolve({
      statusCode: 400,
    });
  }

  const token = cookie.parse(cookies)['babylon-token'];
  const tokenPayload = await safelyVerify(token);

  if (!tokenPayload) {
    return Promise.resolve({
      statusCode: 400,
    });
  }

  const { email } = tokenPayload as JwtPayload;
  const match: { ref; data: Record<string, unknown> } = await client.query(
    q.Get(q.Match(q.Index('email'), email)),
  );

  const userRef = match.ref.toJSON()['@ref'].id;

  const faunaPayload = {
    user: userRef,
    read,
    day: parseInt(day, 10),
  };

  await client.query(q.Create(q.Collection('completions'), { data: faunaPayload }));

  return response;
};

export { handler };
