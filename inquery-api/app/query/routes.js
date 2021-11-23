const flow = require('./api/flow')
const aggregate = require('./api/aggregate')

module.exports = async function (fastify, opts) {
  fastify.get('/flow', flow)
  fastify.post('/aggregate', aggregate)
}
