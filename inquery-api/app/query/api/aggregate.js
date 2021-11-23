const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  // TODO : validate
  const { table, query } = req.body

  const collectionName = 'data__events' // TODO : receive from query

  const db = await getDatabase()
  const collection = await db.collection(collectionName)

  const result = await collection.aggregate(query)

  return {
    result: await result.toArray(),
  }
}
