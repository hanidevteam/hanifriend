const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  const db = await getDatabase()
  const collection = await db.collection('data__events')
  const result = await collection.find().limit(300)
  const items = await result.toArray()

  return {
    items,
  }
}
