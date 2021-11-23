const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  const { id } = req.params
  // TODO : validate

  const db = await getDatabase()
  const collection = await db.collection('data__articles')
  const result = await collection.findOne({
    id,
  })

  return {
    item: result,
  }
}
