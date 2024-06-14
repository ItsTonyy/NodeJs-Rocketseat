import Fastify from 'fastify';
import { DataBaseMemory } from './database-memory.js';

const database = new DataBaseMemory()

const server = Fastify();

server.post('/videos', (req, res) => {
  const {title, description, duration} = req.body

  database.create({
    title: title,
    description: description,
    duration: duration,
  })

  return res.status(201).send()
})

server.get('/videos', (req, res) => {
  const videos = database.list()

  console.log(videos)

  return videos
})

server.put('/videos/:id', (req, res) => {
  const videoId = req.params.id
  const {title, description, duration} = req.body

  database.update(videoId, {
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
