import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors'
import { Routes } from './src/User/routes.js';
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()
const  mongoString = process.env.MONGOURI;
const PORT = process.env.PORT;
// const cloudinary = require('cloudinary').v2;


const app = express()
app.use(cors());
app.use(express.json());

app.use(Routes)

app.listen(PORT, () => {
    mongoose.connect(mongoString);
    const database = mongoose.connection
    database.once('connected', () => {
        console.log('Database Connected');
    })
  
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
        
    });

    database.on('error', (error) => {
        console.log('DB connection failed')
    })
    console.log(`Server Started at ${PORT}`)
})

export {
    cloudinary
}