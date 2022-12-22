import { connectionDB } from "../database/db.js";

export async function saveUrl(session, url, shortUrl) {
  return await connectionDB.query(`
    INSERT INTO
      urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3);`, [session.userId, url, shortUrl]);
};

export async function getUrlById(id) {
  return await connectionDB.query(`
    SELECT
      id, "shortUrl", url
    FROM
      urls
    WHERE
      id = $1;`, [id]);
}