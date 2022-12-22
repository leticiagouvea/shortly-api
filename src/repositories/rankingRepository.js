import { connectionDB } from "../database/db.js";

export async function getRanking() {
  return await connectionDB.query(`
    SELECT
      users.id,
      users.name,
      COUNT(urls.id) AS "linksCount",
      COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM
      users
      LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY
      users.id
    ORDER BY
      "visitCount" DESC,
      "linksCount" DESC
    LIMIT
      10;`);
};