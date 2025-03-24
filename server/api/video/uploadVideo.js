import { createWriteStream } from 'fs'
import fs from 'fs'
import videos from '../../../db/videos.json'

export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event)

  const file = formData.find(item => item.name === 'file')
  const title = formData.find(item => item.name === 'title')?.data?.toString()
  const description = formData
    .find(item => item.name === 'description')
    ?.data?.toString()
  const date = formData.find(item => item.name === 'date')?.data?.toString()
  const forUser = formData.find(item => item.name === 'for')?.data?.toString()
  const priority = formData.find(item => item.name === 'priority')?.data?.toString()

  const path = `./public/uploads/video/${file.filename}`

  if (videos.data.some(video => video.name === file.filename)) {
    return {
      type: 'error',
      message: 'این ویدیو را از قبل اضافه کردید!'
    }
  }

  const stream = createWriteStream(path)
  stream.write(file.data)
  stream.end()

  stream.on('finish', () => {
    videos.data.push({
      name: file.filename,
      path: `/uploads/video/${file.filename}`,
      id: crypto.randomUUID(),
      title,
      description,
      date,
      for: forUser,
      status: 'در جریان',
      priority
    })

    fs.writeFileSync('./db/videos.json', JSON.stringify(videos), err => {
      if (err) return err
    })
  })

  return { type: 'success', message: 'ویدیوی شما با موفقیت اضافه شد!' }
})
