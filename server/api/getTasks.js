import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  console.log(query)

  if (query.title)
    return tasks.data.filter(task => task.title.includes(query.title))
  else return tasks.data
})
