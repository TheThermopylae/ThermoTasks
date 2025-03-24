import category from '../../../db/category.json'
export default defineEventHandler(async event => {
  let query = getQuery(event)

  return category.data.filter(categoryItem =>
    categoryItem.for.includes(query.user)
  )
})
