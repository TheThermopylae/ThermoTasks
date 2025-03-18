import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  if (query.name)
    return tasks.data.filter(task => task.name.includes(query.name))
  else return tasks.data
})
