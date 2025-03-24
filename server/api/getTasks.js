import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  if (query.title)
    return tasks.data.filter(task => task.title.includes(query.title))
  else if (query.sort && query.sort == 'new') {
    let tasksUser = tasks.data
      .filter(task => task.for.includes(query.user))
      .reverse()
    return tasksUser
  } else if (query.sort && query.sort == 'a-z') {
    let tasksUser = tasks.data
      .filter(task => task.for.includes(query.user))
      .sort((a, b) => a.title.localeCompare(b.title))
    return tasksUser
  } else if (query.sort && query.sort == 'z-a') {
    let tasksUser = tasks.data
      .filter(task => task.for.includes(query.user))
      .sort((a, b) => b.title.localeCompare(a.title))
    return tasksUser
  } else return tasks.data.filter(task => task.for.includes(query.user))
})
