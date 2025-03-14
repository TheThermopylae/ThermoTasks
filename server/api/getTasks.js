import tasks from '../../db/tasks.json'

export default defineEventHandler(async event => {
  // console.log(tasks)

  return tasks.data
})
