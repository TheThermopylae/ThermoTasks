import { writeFile } from 'fs/promises'
import fs from 'fs'
// import musics from '../../../db/musics.json'

export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event)

  const file = formData.find(item => item.name == 'file')
  const path = './public/uploads/' + file.filename

  await writeFile(path, file.data)

  return {
    type: 'success',
    message: 'موسیقی با موفقیت اضافه شد'
  }
})
