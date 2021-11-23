const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  const db = await getDatabase()
  const collection = await db.collection('meta__analysis')
  const result = await collection.find()
  const items = await result.toArray()

  return {
    items,
  }
}
