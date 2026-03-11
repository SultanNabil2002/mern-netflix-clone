require("dotenv").config()
const express = require('express');
const cors = require("cors")
const routes = require("./routes/index.route.js")
const mongoose = require("mongoose")
const swaggerUI = require("swagger-ui-express")
const swaggerDocs = require("./swagger.json");

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

// 1. Fungsi khusus untuk lingkungan Serverless Vercel
const connectDB = async () => {
    // Jika mongoose sudah terkoneksi (readyState 1) atau sedang proses koneksi (readyState 2), biarkan saja
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    // Jika terputus, paksa sambungkan ulang
    try {
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000 // Jangan tunggu kelamaan kalau Atlas sedang down
        });
        console.log("MongoDB Terkoneksi (Serverless Wakeup)!");
    } catch (error) {
        console.log("Gagal konek MongoDB:", error.message);
    }
};

// 2. Middleware: Setiap ada request dari user, periksa nyawa database dulu!
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server API Berjalan Di PORT ${PORT}`)
})

module.exports = app