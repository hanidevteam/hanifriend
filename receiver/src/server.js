require('dotenv').config()
const Fastify = require('fastify')
const CORS = require('fastify-cors')
const { MongoClient } = require('mongodb')
const { PubSub } = require('@google-cloud/pubsub')

const IN_PRODUCTION = process.env.K_SERVICE !== undefined
const HOST = IN_PRODUCTION ? '0.0.0.0' : undefined
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

const PROJECT_ID = process.env.GCP_PROJECT_ID


const build = () => {
  const server = Fastify({
    trustProxy: true,
  })

  server.register(CORS)

  server.get('/', async (request, reply) => {
    reply.send('OK')
  })

  server.get('/status', async (request, reply) => {
    const client = new MongoClient(MONGODB_URI)

    try {
      await client.connect()
      const db = client.db('companion')
      const admin = await db.admin()
      const ping = await admin.ping()

      reply.send(`LIVE ${ping.operationTime}`)
    } finally {
      await client.close()
    }
  })

  server.post('/track', async (request, reply) => {
    const payload = JSON.parse(request.body)
    // TODO : validation
    // TODO : publish to pubsub

    // save to MongoDB
    const client = new MongoClient(MONGODB_URI)

    try {
      payload.ts = Date.now()
      payload.ua = request.headers['user-agent']

      await client.connect()
      const db = client.db('companion')
      const collection = await db.collection('raw_events')

      await collection.insertOne(payload)

      const pubsub = new PubSub()


      reply.send('OK')
    } finally {
      await client.close()
    }
  })

  return server
}

const start = async () => {
  try {
    const server = build()
    const listenOn = await server.listen(PORT, HOST)
    console.log(`Listening on ${listenOn}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
