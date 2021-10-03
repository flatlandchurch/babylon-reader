import { Handler } from '@netlify/functions';
import fauna from 'faunadb';
import catchify from 'catchify';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_KEY || '' });

const EMAIL_TOKEN = process.env.EMAIL_TOKEN;
sgMail.setApiKey(process.env.SENDGRID_KEY);

const handler: Handler = async (event, context) => {
  const { email } = JSON.parse(event.body);
  const [err] = await catchify(client.query(q.Get(q.Match(q.Index('email'), email))));

  if (err) {
    const payload = {
      email,
      created: new Date().toISOString(),
      pcoID: '',
    };
    await client.query(q.Create(q.Collection('users'), { data: payload }));
    console.log(`Created new user with email address: ${email}`);
  }

  const token = await jwt.sign({ email }, EMAIL_TOKEN);

  sgMail.send({
    html: `<p>Hey there!</p><p>We're so excited for you to read the Bible with us.</p><p><a href="https://babylon.flatland.church/auth?token=${token}">Here's your magic link.</a> Just click it and you'll be logged in!</p><p>~ Flatland Team</p>`,
    to: email,
    from: 'no-reply@flatland.church',
    subject: 'Your magic link for Babylon',
  });

  console.log(`Sent email with token.`);

  return {
    statusCode: 200,
  };
};

export { handler };
