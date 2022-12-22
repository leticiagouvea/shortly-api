import { deleteUrlById, getAllDataUrlById, getShortUrl, getUrlById, saveUrl, updateUrl } from "../repositories/urlRepository.js";
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

export async function readUrlById(req, res) {
  const { id } = req.params;

  try {
    const url = await getUrlById(id);

    if (url.rowCount === 0) {
      return sendStatus(404);
    }

    res.status(200).send(url.rows[0]);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function readShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await getShortUrl(shortUrl);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    await updateUrl(url.rows[0], shortUrl);

    res.redirect(url.rows[0].url);

  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const session = res.locals.session;
  console.log(id)

  try {
    const url = await getAllDataUrlById(id);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    if (session.userId !== url.rows[0].userId) {
      return res.sendStatus(401);
    }

    await deleteUrlById(id);

    res.sendStatus(204);

  } catch (error) {
    res.status(500).send(error.message);
  }
}