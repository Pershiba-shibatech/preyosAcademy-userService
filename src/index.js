import express from 'express'
import mongoose from 'mongoose'
// import dotenv from 'dotenv';
import cors from 'cors'

// import { v2 as cloudinary } from 'cloudinary'
import { Routes } from './User/routes.js'

// dotenv.config()
const PORT = "4000"
const MONGOURI = "mongodb+srv://shibatech06:WGusDjuuIdUiIYvi@educationalportal.dqe7jah.mongodb.net/educationalportal?retryWrites=true&w=majority"
// const CLOUDINARY_CLOUD_NAME = "dwm8g1j8i"
// const CLOUDINARY_API_KEY = "745971731583546"
// const CLOUDINARY_API_SECRET = "rs96Q4RdDvys-NUwubZHvoGShj8"
// const CLOUDINARY_URL = "cloudinary://745971731583546:rs96Q4RdDvys-NUwubZHvoGShj8@dwm8g1j8i"
const mongoString = MONGOURI;

// const cloudinary = require('cloudinary').v2;


const app = express()
app.use(cors());
app.use(express.json());

app.use(Routes)
app.get('/', (req, res) => {
    res.send('Hello from Vercel');
});

const server = app.listen(PORT, () => {
    mongoose.connect(mongoString);
    const database = mongoose.connection
    database.once('connected', () => {
        console.log('Database Connected');
    })

    // cloudinary.config({
    //     cloud_name: CLOUDINARY_CLOUD_NAME,
    //     api_key: CLOUDINARY_API_KEY,
    //     api_secret: CLOUDINARY_API_SECRET

    // });

    database.on('error', (error) => {
        console.log('DB connection failed')
    })
    console.log(`Server Started at ${PORT}`)
})
server.setTimeout(300000, () => {
    console.log('Request timed out');
});
// export {
//     cloudinary
// }