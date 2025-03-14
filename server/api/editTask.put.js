import fs from 'fs'
import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let body = await readBody(event)

  let query = getQuery(event)
  let findTask = tasks.data.findIndex(task => task.id == query.id)
  tasks.data[findTask] = body

  fs.writeFileSync('./db/tasks.json', JSON.stringify(tasks), err => {
    if (err) throw err
  })

  return tasks
})
