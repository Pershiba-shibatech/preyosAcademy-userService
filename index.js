import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {tutorRoutes} from './src/User/routes.js';

dotenv.config()
const  mongoString = process.env.MONGOURI;
const PORT = process.env.PORT;

const app = express()
app.use(express.json());

app.use(tutorRoutes)

app.listen(PORT, () => {
    mongoose.connect(mongoString);
    const database = mongoose.connection
    database.once('connected', () => {
        console.log('Database Connected');
    })
    database.on('error', (error) => {
        console.log('DB connection failed')
    })
    console.log(`Server Started at ${PORT}`)
})