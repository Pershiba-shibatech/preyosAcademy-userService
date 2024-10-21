import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors'

// import { v2 as cloudinary } from 'cloudinary'
import { Routes } from './User/routes.js'

dotenv.config()
const PORT = "4000"
const MONGOURI = "mongodb+srv://shibatech06:WGusDjuuIdUiIYvi@educationalportal.dqe7jah.mongodb.net/educationalportal"
// const CLOUDINARY_CLOUD_NAME = "dwm8g1j8i"
// const CLOUDINARY_API_KEY = "745971731583546"
// const CLOUDINARY_API_SECRET = "rs96Q4RdDvys-NUwubZHvoGShj8"
// const CLOUDINARY_URL = "cloudinary://745971731583546:rs96Q4RdDvys-NUwubZHvoGShj8@dwm8g1j8i"
const mongoString = process.env.MONGOURI;

// const cloudinary = require('cloudinary').v2;


const app = express()
// app.use(cors());
app.use(cors({
    origin: '*',  
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.json());

app.use(Routes)
app.get('/test', (req, res) => {
    // mongoose.connect(mongoString, {
    //     serverSelectionTimeoutMS: 30000
    // });
    // const database = mongoose.connection
    // database.once('connected', () => {
    //     console.log('Database Connected');

    // })
    res.send('Hello from Vercel');
});
app.get('/ping-db', async (req, res) => {
    try {
        // Create a new MongoClient
        const client = new MongoClient(mongoString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Connect the client to the server
        await client.connect();

        // Ping the database to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        // Send a success response if ping is successful
        res.status(200).json({ message: 'Ping to MongoDB was successful!' });

        // Close the connection
        await client.close();
    } catch (error) {
        // Handle connection errors
        res.status(500).json({ message: 'Failed to ping MongoDB', error: error.message });
    }
});

app.listen(PORT, () => {
    mongoose.connect(mongoString, {
        serverSelectionTimeoutMS: 30000 // Adjust this value as needed
    });
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

// export {
//     cloudinary
// }