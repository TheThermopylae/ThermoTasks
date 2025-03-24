import category from '../../../db/category.json'
export default defineEventHandler(async event => {
  return category.data
})
