import { getRandomNumbers } from "./random";
import { conn } from "../db";

const QUERY_GET_TOTAL_AMOUNT_OF_SONGS = 'SELECT COUNT(*) FROM songs;';

export async function generateMatch() {
  // Get total amount of songs
  const queryResponse = await conn.execute(QUERY_GET_TOTAL_AMOUNT_OF_SONGS) as any
  const totalSongs = parseInt(queryResponse.rows[0]['count(*)'])

  const randomNumbers = getRandomNumbers(3, totalSongs)
  return randomNumbers
}
