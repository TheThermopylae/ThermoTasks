import fs from 'fs'
import tasks from '../../db/tasks.json'
import category from '../../db/category.json'

export default defineEventHandler(async event => {
  let query = getQuery(event)

  let findTaskIndex = tasks.data.findIndex(task => task.id == query.taskId)

  let findCategoryIndex = category.data.findIndex(
    categoryItem => categoryItem.title == tasks.data[findTaskIndex].category
  )

  let removeUserInCategory = category.data[findCategoryIndex].for.filter(
    user => user !== query.username
  )

  let removeUserInTaskFor = tasks.data[findTaskIndex].for.filter(
    task => task !== query.username
  )

  let removeUserInTaskDone = tasks.data[findTaskIndex].done.filter(
    task => task !== query.username
  )

  tasks.data[findTaskIndex].for = removeUserInTaskFor
  tasks.data[findTaskIndex].done = removeUserInTaskDone
  category.data[findCategoryIndex].for = removeUserInCategory

  fs.writeFileSync('./db/tasks.json', JSON.stringify(tasks), err => {
    if (err) throw err
  })

  fs.writeFileSync('./db/category.json', JSON.stringify(category), err => {
    if (err) throw err
  })
  return tasks
})
