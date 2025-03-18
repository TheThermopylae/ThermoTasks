import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  return tasks.data.find(task => task.id === query.id)
})
