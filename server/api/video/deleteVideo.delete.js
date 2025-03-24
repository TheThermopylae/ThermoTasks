import fs from 'fs'
import videos from '../../../db/videos.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  videos.data = videos.data.filter(video => video.id !== query.id)

  fs.writeFileSync('./db/videos.json', JSON.stringify(videos), err => {
    if (err) throw err
  })

  return videos
})
