const express = require('express')
const app = express()
const server = require('http').Server(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

//Configuraciones adicionales
const config = require('./src/config')

// habilitar CORS para aceptar consultas de otros domiminios
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost') //Frontend url
  next()
})

// Formatear peticiones
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Configurar proxy
app.set('trust proxy', true)


//Archivos staticos
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//Iniciar servidor
server.listen(config.port, () => {
  console.log(`La aplicacion esta escuchando en ${config.host}:${config.port}`)
})
