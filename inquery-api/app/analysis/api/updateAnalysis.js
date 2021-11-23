const getDatabase = require('utils/db').getDatabase
const { ObjectId } = require('mongodb')

module.exports = async function (req, reply) {
  const { id } = req.params
  const data = req.body
  // TODO : validate

  const db = await getDatabase()
  const collection = await db.collection('meta__analysis')
  return await collection.updateOne({
    _id: ObjectId(id),
  }, {
    $set: {
      title: data.title,
      describe: data.describe,
      body: data.body,
      timeModified: Date.now(),
    },
  })
}
