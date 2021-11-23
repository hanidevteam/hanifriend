const getUser = require('./api/getUser')
const listUsers = require('./api/listUsers')
const listUserEvents = require('./api/listUserEvents')

module.exports = async function (fastify, opts) {
  fastify.get('/', listUsers)
  fastify.get('/:userId', getUser)
  fastify.get('/:userId/events', listUserEvents)
}
