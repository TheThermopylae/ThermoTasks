import fs from 'fs'
import category from '../../../db/category.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  category.data = category.data.filter(task => task.id !== query.id)

  fs.writeFileSync('./db/category.json', JSON.stringify(category), err => {
    if (err) throw err
  })

  return category
})
