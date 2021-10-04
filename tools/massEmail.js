require('dotenv').config();
const fauna = require('faunadb');
const catchify = require('catchify');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_KEY);

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_KEY || '' });

const [emailTmplPath] = process.argv.slice(2);

const massEmail = async (emailPath) => {
  if (!emailPath) {
    process.exit(1);
  }

  const [, data] = await catchify(
    client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_users')), { size: 250 }),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    ),
  );

  const template = fs.readFileSync(path.join(__dirname, '../emails', emailPath)).toString();

  const emails = data.data.map(({ data }) => data.email);

  const [err] = await catchify(
    sgMail.send({
      html: template,
      subject: '[Babylon Read] Well, I goofed up!',
      from: 'no-reply@flatland.church',
      to: 'no-reply@flatland.church',
      replyTo: 'mubatt@wyopub.com',
      bcc: emails,
    }),
  );
  console.log(err);
};

massEmail(emailTmplPath);
