const express = require("express")
const path = require('path')
const router = require('./router.js')
const { v4: uuidv4 } = require('uuid');
const cors = require("cors")


const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')))


//MIDDLEWARE

//for parsing json data in requests
app.use(express.json())

// request handling is in router file
app.use(router)

//for handling cors
app.use(cors())



//LISTEN

const port = process.env.PORT || 5000
app.listen(port)

console.log(`server listening on ${port}`)

module.exports = app

