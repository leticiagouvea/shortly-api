import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { deleteSession, insertSession, listUser, saveUser } from "../repositories/authRepository.js";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.user;

  try {
    const user = await listUser(email);

    if (user.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10); 

    await saveUser(name, email, passwordHash);

    res.sendStatus(201);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function signIn(req, res) {
  const { email, password } = res.locals.user;

  try {
    const user = await listUser(email);
    
    if (user.rowCount === 0 || !bcrypt.compareSync(password, user.rows[0].password)) {
      return res.sendStatus(401);
    }    
    const token = uuid();

    await deleteSession(user.rows[0]);

    await insertSession(user.rows[0], token);

    res.status(200).send({ token });

  } catch (error) {
    res.status(500).send(error.message);
  }
};