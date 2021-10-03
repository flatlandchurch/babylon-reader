import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const { token } = event.queryStringParameters;

  return {
    statusCode: 200,
  };
};

export { handler };
