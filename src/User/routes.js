import express from 'express'
import { AddTutorSlotsByAdminController, createTutorController } from './TutorAuth/Tutor.Controller.js';
import { loginController } from './Login-Logout/loginLogout.controllers.js';
import { createStudentController, getAvailableSlotsForStudentController } from './StudentAuth/Student.controller.js';

export const tutorRoutes = express.Router();

tutorRoutes.post('/loginUser', loginController)

tutorRoutes.post('/createTutor', createTutorController)
tutorRoutes.post('/addSlots', AddTutorSlotsByAdminController)

tutorRoutes.post('/createStudent', createStudentController)
tutorRoutes.post('/fetchAvailableSlotsforStudent', getAvailableSlotsForStudentController)

