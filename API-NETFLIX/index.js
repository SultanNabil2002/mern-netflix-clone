require("dotenv").config()
const express = require('express');
const cors = require("cors")
const path = require("path");
const routes = require("./routes/index.route.js")
const mongoose = require("mongoose")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocs = YAML.load(path.join(__dirname, "swagger.yaml"));

const { API_PORT, MONGO_URL } = process.env

const app = express()
const PORT = API_PORT

app.use(express.json())
app.use(cors())

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
) //cara mengakses: http://localhost:3002/docs

mongoose.connect(MONGO_URL).catch(err => {
    if (err) {
        console.log("tidak dapat terkoneksi ke mongodb!")
    }
})

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server API Berjalan Di PORT ${PORT}`)
})

module.exports = app