import { saveUrl } from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

export async function createUrl(req, res) {
  const { url } = res.locals.url;
  const session = res.locals.session;

  try {
    new URL(url);
    const shortUrl = nanoid();

    await saveUrl(session, url, shortUrl);

    res.status(201).send({ shortUrl });

  } catch (error) {
    res.status(500).send(error.message);
  }
};