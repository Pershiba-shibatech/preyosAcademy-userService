import express from 'express'
import { AddTutorSlotsByAdminController, createTutorController, getTutorsList } from './tutorAuth/Tutor.controller.js';
import { loginController } from './Login-Logout/LoginLogout.controllers.js';
import { createStudentController, getAvailableSlotsForStudentController, getStudentsList } from './StudentAuth/Student.controller.js';
import { fileuploadMiddleware } from '../Middleware/uploadMiddleWare.js';
import { BookSlotsbyV1Controller, BookSlotsbyTutorController, GetBookedSlotsController, GetSlotsController, GetSinglesessionDetails, updateSlotStatus, GetBookedpastSlotsController, updateSlotsLink } from './BookSlots/BookSlots.controllers.js';
import { getStudentLibraryController, getTutorLibraryController } from './Library/Library.controllers.js';


export const Routes = express.Router();

Routes.post('/loginUser', loginController)


Routes.post('/createTutor', createTutorController)
Routes.post('/addSlots', AddTutorSlotsByAdminController)
Routes.get('/getTutorsList', getTutorsList)


Routes.post('/createStudent', createStudentController)
Routes.get('/getStudentsList', getStudentsList)
Routes.post('/fetchAvailableSlotsforStudent', getAvailableSlotsForStudentController)
Routes.post('/v1/bookSlot', fileuploadMiddleware, BookSlotsbyV1Controller)
Routes.post('/bookSlot', BookSlotsbyTutorController)
Routes.post('/getAvailableSlots', GetSlotsController)
Routes.post('/fetchBookedSlots', GetBookedSlotsController)
Routes.post('/fetchBookedPastSlots', GetBookedpastSlotsController)
Routes.get('/fetchSingleSession', GetSinglesessionDetails)
Routes.post('/updateStatus', updateSlotStatus)
Routes.post('/updateSlotLink',updateSlotsLink)

Routes.post('/getTutorsMaterials', getTutorLibraryController)
Routes.post('/getStudentsMaterials', getStudentLibraryController)
