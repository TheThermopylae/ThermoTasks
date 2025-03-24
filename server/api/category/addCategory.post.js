import fs from 'fs'
import category from '../../../db/category.json'

export default defineEventHandler(async event => {
  let body = await readBody(event)

  let someCategory = category.data.some(
    cateogryItem => cateogryItem.title == body.title
  )

  if (someCategory)
    return {
      type: 'error',
      message: 'این دسته بندی از قبل وجود دارد'
    }

  category.data.push({ title: body.title, id: crypto.randomUUID() })

  fs.writeFile('./db/category.json', JSON.stringify(category), err => {
    if (err) throw err
  })
  return category
})
