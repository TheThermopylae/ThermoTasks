import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  if (query.title)
    return tasks.data.filter(task => task.title.includes(query.title))
  else return tasks.data.filter(task => task.for.includes(query.user))
})
