import { getUrlsUser, getUser } from "../repositories/usersRepository.js";

export async function readUser(req, res) {
  const session = res.locals.session;

  try {
    const user = await getUser(session);

    const urlsUser = await getUrlsUser(session);

    if (user.rowCount === 0) {
      return res.sendStatus(404);
    }

    const urlsUserMap = urlsUser?.rows.map(value => ({
      id: value.id,
      shortUrl: value.shortUrl,
      url: value.url,
      visitCount: value.visitCount
    }));

    const result = user?.rows.map(value => ({
      id: value.id,
      name: value.name,
      visitCount: value.visitCount,
      shortenedUrls: [
        ...urlsUserMap
      ]
    }));

    res.status(200).send(result[0]);

  } catch (error) {
    res.status(500).send(error.message);
  }
};