const getDatabase = require('utils/db').getDatabase

const getNodeIndex = (collection, name) => {
  const index = collection.findIndex(e => e.name === name)

  if (index > -1) return index

  collection.push({ name: name })

  return collection.length - 1
}

const getLink = (collection, source, target) => {
  const exist = collection.find(e => e.source === source && e.target === target)

  if (exist) return exist

  const newLink = {
    source,
    target,
    value: 0,
  }
  collection.push(newLink)

  return newLink
}

module.exports = async function (req, reply) {
  const { depth: rawDepth, way, event: targetEvent } = req.query
  // TODO : validate
  const depth = parseInt(rawDepth)

  const now = Date.now()
  const h24 = 60 * 60 * 24 * 1000
  const d5 = h24 * 5

  const nodes = [{ name: targetEvent }]
  const links = []

  const db = await getDatabase()
  const collection = await db.collection('data__events')

  const targets = await collection.find({
    type: targetEvent,
    ts: { $gt: now - d5 },
  }).toArray()

  for (let iter = depth; iter > 0; iter --) {

  }

  for (const target of targets) {
    const { track, ts } = target

    const sources = await collection.find({
      track,
      ts: way === 'before' ? {$lt: ts} : {$gt: ts},
    }).limit(depth).toArray()

    for (const source of sources) {
      const targetIndex = getNodeIndex(nodes, target['type'])
      const sourceIndex = getNodeIndex(nodes, source['type'])
      if (targetIndex === sourceIndex) {
        continue
      }

      const link = way === 'before'
        ? getLink(links, sourceIndex, targetIndex)
        : getLink(links, targetIndex, sourceIndex)

      link.value += 1
    }
  }

  links.sort((a, b) => a.source - b.source)

  return {
    nodes,
    links,
  }
}
