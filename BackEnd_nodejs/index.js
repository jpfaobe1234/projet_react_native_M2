const express = require('express')
var bodyParser = require('body-parser')

const app = express()

require('dotenv').config()

const enseignantRouter = require('./Routes/enseignantRoute')

app.use(express.urlencoded({extended:false}))
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));
// app.use(express.json)

//point d'entrée
app.use("/enseignant", enseignantRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Lancement du serveur...", PORT )
})