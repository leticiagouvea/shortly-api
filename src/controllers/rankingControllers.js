import { getRanking } from "../repositories/rankingRepository.js";

export async function readRanking(req, res) {
  try {
    const ranking = await getRanking();
    
    res.status(200).send(ranking.rows);

  } catch (error) {
    res.status(500).send(error.message);
  }
};