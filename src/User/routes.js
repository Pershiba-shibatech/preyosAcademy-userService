import express from 'express'
import { createTutorController } from './tutorAuth/Tutor.Controller.js';

export const tutorRoutes = express.Router();
tutorRoutes.post('/createTutor', createTutorController)

