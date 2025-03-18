import musics from '../../../db/musics.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)
  if (query.name) {
    return musics.data.filter(music =>
      music.name.toLowerCase().includes(query.name.toLowerCase())
    )
  } else {
    return musics.data
  }
})
