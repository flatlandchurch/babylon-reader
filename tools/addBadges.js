require('dotenv').config();
const fauna = require('faunadb');
const catchify = require('catchify');

const q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_KEY || '' });

const args = process.argv.slice(2);

const addBadges = async (day) => {
  const [, data] = await catchify(
    client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_users')), { size: 250 }),
        q.Lambda('x', q.Get(q.Var('x'))),
      ),
    ),
  );

  await Promise.all(
    data.data
      .filter(({ ref }) => {
        const user = ref.toJSON()['@ref'].id;
        return !skipUsers.includes(user);
      })
      .map(async ({ ref }) => {
        const user = ref.toJSON()['@ref'].id;
        const faunaPayload = {
          user,
          read: new Date().toISOString(),
          day,
        };
        console.log(`Inserting record for ${user}`);
        await client.query(q.Create(q.Collection('completions'), { data: faunaPayload }));
      }),
  );
};

addBadges(parseInt(args[0], 10));
