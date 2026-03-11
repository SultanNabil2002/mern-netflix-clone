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

const swaggerOptions = {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-bundle.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui-standalone-preset.js"
    ]
};

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs, swaggerOptions)
);

mongoose.connect(MONGO_URL)
    .then(() => console.log("Berhasil terkoneksi ke MongoDB Atlas!"))
    .catch(err => {
        console.log("GAGAL KONEK MONGODB! Alasan detailnya:", err.message);
    });

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server API Berjalan Di PORT ${PORT}`)
})

module.exports = app