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

export async function insertSession(user, token) {
  return await connectionDB.query(`
    INSERT INTO
      sessions ("userId", token)
    VALUES ($1, $2);`, [user.id, token]);
};

export async function deleteSession(user) {
  return await connectionDB.query(`
    DELETE FROM
      sessions
    WHERE
      "userId" = $1;`, [user.id]);
};