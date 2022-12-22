import bcrypt from "bcrypt";
import { listUser, saveUser } from "../repositories/authRepository.js";

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