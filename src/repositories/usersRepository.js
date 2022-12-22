import { connectionDB } from "../database/db.js";

export async function getUser(session) {
  return await connectionDB.query(`
    SELECT
      users.id,
      users.name,
      SUM("visitCount") AS "visitCount"
    FROM
      users
      JOIN urls ON users.id = urls."userId"
    WHERE
      users.id = $1
    GROUP BY
      users.id;`, [session.userId]);
};

export async function getUrlsUser(session) {
  return await connectionDB.query(`
    SELECT
      id,
      url,
      "shortUrl",
      "visitCount"
    FROM
      urls
    WHERE
      "userId" = $1
    ORDER BY "visitCount" DESC;`, [session.userId]);
};