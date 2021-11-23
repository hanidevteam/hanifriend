const getArticle = require('./api/getArticle')
const getArticleStats = require('./api/getArticleStats')
const listArticles = require('./api/listArticles')

module.exports = async function (fastify, opts) {
  fastify.get('/', listArticles)
  fastify.get('/:id', getArticle)
  fastify.get('/:id/stats', getArticleStats)
}
