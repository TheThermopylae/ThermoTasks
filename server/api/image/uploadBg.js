import { writeFile } from 'fs/promises'
import fs from 'fs'
import bg from '../../../db/bg.json'

export default defineEventHandler(async event => {
  const formData = await readMultipartFormData(event)
  const file = formData.find(item => item.name == 'file')
  const path = './public/uploads/images/' + file.filename
  await writeFile(path, file.data)

  bg.data.push({
    name: file.filename,
    path: '/uploads/images/' + file.filename,
    id: crypto.randomUUID()
  })

  fs.writeFileSync('./db/bg.json', JSON.stringify(bg))

  return {
    type: 'success',
    message: 'بک گراند با موفقیت اضافه شد'
  }
})
