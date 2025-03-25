import { writeFile } from 'fs/promises'
import fs from 'fs'
import musics from '../../../db/musics.json'

export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event)
  const file = formData.find(item => item.name == 'file')
  const path = './public/uploads/music/' + file.filename

  if (musics.data.some(music => music.name === file.filename))
    return {
      type: 'error',
      message: 'این موسیقی را از قبل اضافه کردید!'
    }
  await writeFile(path, file.data)

  musics.data.push({
    name: file.filename,
    path: '/uploads/music/' + file.filename,
    id: crypto.randomUUID()
  })

  fs.writeFileSync('./db/musics.json', JSON.stringify(musics))

  return {
    type: 'success',
    message: 'موسیقی با موفقیت اضافه شد'
  }
})
