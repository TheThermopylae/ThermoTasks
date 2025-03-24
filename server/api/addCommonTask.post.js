import fs from 'fs'
import tasks from '../../db/tasks.json'
import category from '../../db/category.json'

export default defineEventHandler(async event => {
  let body = await readBody(event)

  let findIndexTask = tasks.data.findIndex(task => task.id === body.id)
  tasks.data[findIndexTask] = body

  let findCategory = category.data.findIndex(
    categoryItem => categoryItem.title == tasks.data[findIndexTask].category
  )
  category.data[findCategory].for.push(body.for[body.for.length - 1])

  fs.writeFile('./db/tasks.json', JSON.stringify(tasks), err => {
    if (err) throw err
  })
  fs.writeFile('./db/category.json', JSON.stringify(category), err => {
    if (err) throw err
  })
  return tasks
})
