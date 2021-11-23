const path = require('path')
const aliases = require('module-alias')
const autoload = require('fastify-autoload')

aliases.addPath(path.join(__dirname))

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-cors'))

  fastify.register(autoload, {
    dir: path.join(__dirname, 'app', 'analysis'),
    maxDepth: 0,
    options: {
      prefix: 'api/analysis',
    },
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'app', 'user'),
    maxDepth: 0,
    options: {
      prefix: 'api/users',
    },
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'app', 'article'),
    maxDepth: 0,
    options: {
      prefix: 'api/articles',
    },
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'app', 'event'),
    maxDepth: 0,
    options: {
      prefix: 'api/events',
    },
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'app', 'query'),
    maxDepth: 0,
    options: {
      prefix: 'api/query',
    },
  })

  fastify.register(autoload, {
    dir: path.join(__dirname, 'middlewares'),
    options: Object.assign({}, opts)
  })
}
