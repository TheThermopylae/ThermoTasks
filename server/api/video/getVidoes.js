import videos from '../../../db/videos.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  if (query.title)
    return videos.data.filter(video => video.title.includes(query.title))
  else return videos.data.filter(video => video.for.includes(query.user))
})
