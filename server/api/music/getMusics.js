import musics from '../../../db/musics.json'

export default defineEventHandler(async event => musics.data)
