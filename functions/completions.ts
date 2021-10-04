import { Handler, HandlerResponse } from '@netlify/functions';
import fauna from 'faunadb';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';

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

  const response: HandlerResponse = {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json',
    },
    statusCode: 200,
  };

  if (!cookies) {
    response.statusCode = 400;
    return Promise.resolve(response);
  }

  const token = cookie.parse(cookies)['babylon-token'];
  const tokenPayload = await safelyVerify(token);

  if (!tokenPayload) {
    response.statusCode = 400;
    return Promise.resolve(response);
  }

  const { email } = tokenPayload as JwtPayload;
  const match: { ref; data: Record<string, unknown> } = await client.query(
    q.Get(q.Match(q.Index('email'), email)),
  );

  const userRef = match.ref.toJSON()['@ref'].id;

  const completions: { data: Record<string, unknown>[] } = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('completion-user'), userRef)),
      q.Lambda('x', q.Get(q.Var('x'))),
    ),
  );

  return {
    statusCode: 200,
    body: JSON.stringify(completions.data.map(({ data }) => data)),
  };
};

export { handler };
