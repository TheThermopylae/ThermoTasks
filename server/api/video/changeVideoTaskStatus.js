import fs from 'fs'
import videos from '../../../db/videos.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)
  let body = await readBody(event)

  let findVideoIndex = videos.data.findIndex(video => video.id == query.id)

  videos.data[findVideoIndex] = body

    fs.writeFileSync('./db/videos.json', JSON.stringify(videos), err => {
      if (err) throw err
    })

  return videos
})
