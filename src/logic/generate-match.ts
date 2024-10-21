import { getDBConnection } from "../db";
import { Env } from "../env";
import { getRandomElementsFromList, getRandomNumbers } from "./random";

interface MatchOptions {
  amount?: number,
  repeatAnimes?: boolean
}

const QUERY_GET_TOTAL_AMOUNT_OF_SONGS = 'SELECT COUNT(*) FROM songs;'
const QUERY_GET_SONGS_BY_CONDITION = 'SELECT * FROM songs WHERE {};'
const QUERY_GET_EVERY_ANIME = 'SELECT DISTINCT anime FROM songs;'

export async function generateMatch(env: Env, options: MatchOptions) {
  let { amount, repeatAnimes } = options
  let response
  console.log('env', env, 'options', options)
  // Set default options
  if(!amount) 
    amount = env.DEFAULT_SONGS_AMOUNT
  if(!repeatAnimes)
    repeatAnimes = (env.DEFAULT_REPEAT_ANIMES == 'true')

  try {
    // Get database connection
    const conn = getDBConnection(env)

    if (repeatAnimes) {
      // Get total amount of songs
      const queryResponse = await conn(QUERY_GET_TOTAL_AMOUNT_OF_SONGS)
      const totalSongs = queryResponse.rowCount

      // Get random ids
      const randomIds = getRandomNumbers(amount, 1, totalSongs)

      // Use random ids to get the songs
      const selectedSongsResponse = await conn(buildQuerySongsByIds(randomIds))
      response = selectedSongsResponse
    } else {
      // Get a list of every anime
      let queryResponse = await conn(QUERY_GET_EVERY_ANIME)
      const allAnimes = queryResponse.rows.map((row) => row.anime)

      // Choose random animes from it
      const randomAnimes = getRandomElementsFromList(allAnimes, amount)

      // Choose random songs from selected animes
      const randomSongsPromises = randomAnimes.map(async anime => {
        // Get all songs for that anime
        queryResponse = await conn(buildQuerySongsByAnime(anime))
        const allSongs = queryResponse.rows

        // Select a song at random
        return getRandomElementsFromList(allSongs, 1)[0]
      })
      response = await Promise.all(randomSongsPromises)
    }
    return response
  } catch (error: any) {
    console.error(error.message)
  }
}

function buildQuerySongsByIds(ids: number[]) {
  // Set first id
  let condition = `id = ${ids[0]}`

  // Set the rest of them
  for (let pos = 1; pos < ids.length; pos++) {
    condition = condition + ` OR id = ${ids[pos]}`
  }

  // Replace the condition in the query template
  return QUERY_GET_SONGS_BY_CONDITION.replace('{}', condition)
}

function buildQuerySongsByAnime(anime: string) {
  const sanitizedAnime = anime.replaceAll(`'`, `\\'`)
  return QUERY_GET_SONGS_BY_CONDITION.replace('{}', `anime = '${sanitizedAnime}'`)
}
