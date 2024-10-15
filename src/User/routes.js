import express from 'express'
import { AddTutorSlotsByAdminController, createTutorController, getTutorsList } from './TutorAuth/Tutor.Controller.js';
import { loginController } from './Login-Logout/loginLogout.controllers.js';
import { createStudentController, getAvailableSlotsForStudentController, getStudentsList } from './StudentAuth/Student.controller.js';
import { fileuploadMiddleware } from '../Middleware/uploadMiddleWare.js';
import { BookSlotsbyStudentController, GetBookedSlotsController } from './BookSlots/BookSlots.controllers.js';


export const Routes = express.Router();

Routes.post('/loginUser', loginController)


Routes.post('/createTutor', createTutorController)
Routes.post('/addSlots', AddTutorSlotsByAdminController)
Routes.get('/getTutorsList',getTutorsList)


Routes.post('/createStudent', createStudentController)
Routes.get('/getStudentsList',getStudentsList)
Routes.post('/fetchAvailableSlotsforStudent', getAvailableSlotsForStudentController)
Routes.post('/bookSlot', fileuploadMiddleware, BookSlotsbyStudentController)

Routes.post('/fetchStudentBookedSlots', GetBookedSlotsController)
