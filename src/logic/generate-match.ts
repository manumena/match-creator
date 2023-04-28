import { Connection, connect } from "@planetscale/database";
import { getDBConnection } from "../db";
import { Env } from "../env";
import { getRandomNumbers } from "./random";

const QUERY_GET_TOTAL_AMOUNT_OF_SONGS = 'SELECT COUNT(*) FROM songs;';
const QUERY_GET_SONGS_BY_ID = 'SELECT * FROM songs WHERE {};';

export async function generateMatch(env: Env, amount?: number) {
  try {
    // Get database connection
    const conn = getDBConnection(env)

    // Get total amount of songs
    let queryResponse = await conn.execute(QUERY_GET_TOTAL_AMOUNT_OF_SONGS) as any
    const totalSongs = parseInt(queryResponse.rows[0]['count(*)'])
    
    // Get random ids
    const randomIds = getRandomNumbers(amount ? amount : 5, totalSongs)
  
    // Use random ids to get the songs
    const selectedSongsResponse = await conn.execute(buildSelectedIdsQuery(randomIds))
    return selectedSongsResponse.rows
  } catch (error: any) {
    console.error(error.message)
  }
}

function buildSelectedIdsQuery(ids: number[]) {
  // Set first id
  let condition = `id = ${ids[0]}`

  // Set the rest of them
  for (let pos = 1; pos < ids.length; pos++) {
    condition = condition + ` OR id = ${ids[pos]}`
  }

  // Replace the condition in the query template
  return QUERY_GET_SONGS_BY_ID.replace('{}', condition)
}