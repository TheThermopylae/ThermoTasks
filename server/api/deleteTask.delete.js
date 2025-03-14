import fs from 'fs'
import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let body = await readBody(event)

  let query = getQuery(event)

  tasks.data = tasks.data.filter(task => task.id !== query.id)

  fs.writeFileSync('./db/tasks.json', JSON.stringify(tasks), err => {
    if (err) throw err
  })

  return tasks
})
