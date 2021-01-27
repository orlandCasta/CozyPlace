/*

Index.js, is in charge of receiving the requests, it is the server,
it will verify that the requests are correct to enter the server or cancel them,
it has important configuration, database, headers, etc. the server.js
sends the information to response.js and route.js

*/

require('dotenv').config()
const express = require('express'); // requrimos express
const user = require('./api/components/user/network');
const post = require('./api/components/post/network');
const show = require('./api/components/show/network');
const tag = require('./api/components/tags/network');
const app = express(); // inicializamos el aplicativo de express
const db = require('./storage/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const cors = require('cors')

// [initializing database]
db('')


// [server configuration]
app.set('port', process.env.PORT || 3000)
// [configuration body-parser]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// [routes]
app.use('/api/user', user); // llamando a ruta, todo lo que venga de esa ruta va a user
app.use('/api/post', post); // llamando a ruta, todo lo que venga de esa ruta va a post
app.use('/api/show', show); // llamando a ruta, todo lo que venga de esa ruta va a show
app.use('/api/tag', tag); // llamando a ruta, todo lo que venga de esa ruta va a show
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));



// [static files]
app.use('/app', express.static('public'))

// [starting server]
app.listen(app.get('port'), () => {
    console.log(`[ Server on port ${app.get('port')} ]`)
  })
