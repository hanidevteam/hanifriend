const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  // TODO : validation
  const data = req.body

  const now = new Date().getTime()

  const db = await getDatabase()
  const collection = await db.collection('meta__analysis')
  const result = await collection.insertOne({
    ...data,
    timeModified: now,
    timeCreated: now,
    body: null,
  })

  if (!result.acknowledged) {
    // TODO : 400
  }

  return {
    created: true,
    id: result.insertedId,
  }
}
