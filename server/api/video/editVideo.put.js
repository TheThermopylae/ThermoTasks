import { writeFile } from 'fs/promises'
import fs from 'fs'
import videos from '../../../db/videos.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)
  let findVideoIndex = videos.data.findIndex(video => video.id == query.id)

  const formData = await readMultipartFormData(event)

  const file = formData.find(item => item.name === 'file')
  const title = formData.find(item => item.name === 'title')?.data?.toString()
  const priority = formData
    .find(item => item.name === 'priority')
    ?.data?.toString()
  const description = formData
    .find(item => item.name === 'description')
    ?.data?.toString()

  const path = file.filename ? `./public/uploads/video/${file?.filename}` : ''

  console.log(file.filename)

  if (file.filename) {
    await writeFile(path, file.data)
  }

  videos.data[findVideoIndex] = {
    ...videos.data[findVideoIndex],
    title,
    description,
    path: file.filename
      ? `/uploads/video/${file.filename}`
      : videos.data[findVideoIndex].path,
    priority
  }

  fs.writeFileSync('./db/videos.json', JSON.stringify(videos), err => {
    if (err) return err
  })
  return { type: 'success', message: 'ویدیوی شما با موفقیت ویرایش شد!' }
})
