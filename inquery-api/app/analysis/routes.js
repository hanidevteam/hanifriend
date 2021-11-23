const getAnalysis = require('./api/getAnalysis')
const listAnalysis = require('./api/listAnalysis')
const createAnalysis = require('./api/createAnalysis')
const updateAnalysis = require('./api/updateAnalysis')

module.exports = async function (fastify, opts) {
  fastify.get('/', listAnalysis)
  fastify.post('/', createAnalysis)
  fastify.get('/:id', getAnalysis)
  fastify.post('/:id', updateAnalysis)
}
