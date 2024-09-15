import express from 'express'
import { AddTutorSlotsByAdminController, createTutorController } from './TutorAuth/Tutor.Controller.js';
import { loginController } from './Login-Logout/loginLogout.controllers.js';
import { createStudentController, getAvailableSlotsForStudentController } from './StudentAuth/Student.controller.js';
import { fileuploadMiddleware } from '../Middleware/uploadMiddleWare.js';
import { BookSlotsbyStudentController } from './BookSlots/BookSlots.controllers.js';


export const Routes = express.Router();

Routes.post('/loginUser', loginController)


Routes.post('/createTutor', createTutorController)
Routes.post('/addSlots', AddTutorSlotsByAdminController)

Routes.post('/createStudent', createStudentController)
Routes.post('/fetchAvailableSlotsforStudent', getAvailableSlotsForStudentController)
Routes.post('/bookSlot', fileuploadMiddleware, BookSlotsbyStudentController)


