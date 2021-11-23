const listEvents = require('./api/listEvents')

module.exports = async function (fastify, opts) {
  fastify.get('/', listEvents)
}
