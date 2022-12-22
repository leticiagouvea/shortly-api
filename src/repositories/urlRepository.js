import { connectionDB } from "../database/db.js";

export async function saveUrl(session, url, shortUrl) {
  return await connectionDB.query(`
    INSERT INTO
      urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3);`, [session.userId, url, shortUrl]);
};