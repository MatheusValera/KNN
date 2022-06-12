const express = require('express')
const multer  = require('multer')
const bp = require('body-parser')
const server = new express()
const { knn } = require('./src/knn')

const upload = multer({ dest: './src/tests' })
server.use(bp.json())
server.use('/static', express.static(__dirname+'/static'))

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
})

server.post('/knn', upload.array('files', 2), async (req, res) => {
  const k = req.body.k
  console.log(req)
  const { files } = req
  const matrix = await knn(k, files[1].filename, files[0].filename)
  res.json({ matrix })
})

server.post('/knnTest', upload.array('files', 2), async (req, res) => {
  const k = req.body.k
  const matrix = await knn(k,'base_teste.csv','base_treinamento.csv')
  res.json({ matrix })
})

server.listen(8080, () => {
  console.log("Server is running...")
})