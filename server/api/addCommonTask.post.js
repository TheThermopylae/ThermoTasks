import fs from 'fs'
import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let body = await readBody(event)

  let findIndexTask = tasks.data.findIndex(task => task.id === body.id)
  tasks.data[findIndexTask] = body

  fs.writeFile('./db/tasks.json', JSON.stringify(tasks), err => {
    if (err) throw err
  })
  return tasks
})