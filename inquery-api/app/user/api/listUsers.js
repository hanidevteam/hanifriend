const getDatabase = require('utils/db').getDatabase

const OPERATORS = {
  equal: '$eq',
  notEqual: '$ne',
  exists: '$exists',
}

module.exports = async function (req, reply) {
  const { query } = req.query
  // TODO : validate

  const filters = {}

  if (query) {
    const { attribute, behave } = JSON.parse(query)

    attribute.children.map(f => {
      filters[f.field] = {
        [OPERATORS[f.operator]]: f.value,
      }
    })
  }

  const db = await getDatabase()
  const collection = await db.collection('data__users')
  const result = await collection.find(filters).limit(300)
  const items = await result.toArray()

  return {
    items,
  }
}
