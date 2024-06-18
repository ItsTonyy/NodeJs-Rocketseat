import Fastify from 'fastify';
//import { DataBaseMemory } from './database-memory.js';
import { DataBasePostgres } from './database-postgres.js';

//const database = new DataBaseMemory()
const database = new DataBasePostgres();

const server = Fastify();

server.post('/videos', async (req, res) => {
  const {title, description, duration} = req.body

  await database.create({
    title: title,
    description: description,
    duration: duration,
  })

  return res.status(201).send()
})

server.get('/videos', async (req) => {
  const search = req.query.search
  const videos = await database.list(search)

  console.log(videos)

  return videos
})

server.put('/videos/:id', async (req, res) => {
  const videoId = req.params.id
  const {title, description, duration} = req.body

  await database.update(videoId, {
    title: title,
    description: description,
    duration: duration,
  })

  return res.status(204)
})
server.delete('/videos/:id', (req, res) => {
  const videoId = req.params.id

  database.delete(videoId)

  return res.status(204).send()
})

server.listen({ port: 1000 });
