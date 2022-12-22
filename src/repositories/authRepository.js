import { connectionDB } from "../database/db.js";

export async function listUser(email) {
  return await connectionDB.query(`
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;`, [email]);
};

export async function saveUser(name, email, passwordHash) {
  return await connectionDB.query(`
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3);`, [name, email, passwordHash]);
};

