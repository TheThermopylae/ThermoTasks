import fs from 'fs'
import bg from '../../../db/bg.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  bg.data = bg.data.filter(music => music.id !== query.id)

  fs.writeFileSync('./db/bg.json', JSON.stringify(bg), err => {
    if (err) throw err
  })

  fs.unlinkSync(`./public${query.path}`)
  return bg
})
