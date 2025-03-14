import fs from 'fs'
import musics from '../../../db/musics.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  musics.data = musics.data.filter(music => music.id !== query.id)

  fs.writeFileSync('./db/musics.json', JSON.stringify(musics), err => {
    if (err) throw err
  })

  fs.unlinkSync(`./public${query.path}`)
  return musics
})
