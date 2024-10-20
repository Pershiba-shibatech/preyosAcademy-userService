import { BookaSlotByStudent, GetBookedSlotsofStudentDao, getSlotsForBooking, getSlotsfromDb, updateSlotDetails } from "../../Dao/BookedSlotsDao.js";
import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js";
import { fetchSingleuser } from "../../Dao/TutorDao.js";
import { getSessionDetails, updateBookedStatus, updateSlotBooked } from "../../Dao/Tutorslots.js";
// import { uploadFile } from "./BookSlots.Validator.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const BookSlotsByStudentService = async (body, file) => {
  
    const sessionId = new ObjectId();
    let fileUploadData
    if (file.hasOwnProperty('sessionMaterial')) {
        let filepath = file.sessionMaterial[0].filepath

        if (!filepath) {
            throw new Error('No files uploaded or invalid file path.');
        }

   //     fileUploadData = await uploadFile(filepath, sessionId, body.studenUsercode)

    }


    const BookSlotData = {
        studenUsercode: body.studenUsercode,
        Bookedby: body.Bookedby,
        tutorUsercode: body.tutorUsercode,

        sessionMaterial: file.hasOwnProperty('sessionMaterial') ? {
            url: fileUploadData.url,

            display_name: fileUploadData.display_name,
            format: fileUploadData.format
        } : "",

        sessionId: sessionId,
        sessionDetails: body.sessionDetails,
        sessionSubject: body.sessionSubject,
        paymentStatus: body.paymentStatus,
        sessionLink: body.sessionLink,
        sessionStatus: body.sessionStatus,
        topic: "",
        homeworkStatus: "",
        sessionSummary: "",
        studentFeedbackByTutor: "",
        sessionBookingDetails: {
            from: body.from,
            to: body.to,
            id: body.tutorSlotId

        }


    }

    let bookedSlot = await updateSlotDetails(sessionId, BookSlotData)
    if (bookedSlot) {
        const BookedStatus = await updateBookedStatus(bookedSlot.tutorUsercode, bookedSlot.sessionBookingDetails.from, bookedSlot.sessionBookingDetails.id)
        const resultData = {
            studenUsercode: bookedSlot.studenUsercode,
            tutorUsercode: bookedSlot.tutorUsercode,
            sessionId: bookedSlot.sessionId,
            sessionMaterial: bookedSlot.sessionMaterial,
            sessionBookingDetails: bookedSlot.sessionBookingDetails,
            Bookedby: bookedSlot.Bookedby,
            bookedAt: bookedSlot.createdAt,
            homeworkStatus: bookedSlot.homeworkStatus,
            paymentStatus: bookedSlot.paymentStatus,
            sessionDetails: bookedSlot.sessionDetails,
            sessionLink: bookedSlot.sessionLink,
            sessionStatus: bookedSlot.sessionStatus,
            sessionSubject: bookedSlot.sessionSubject,
            sessionSummary: bookedSlot.sessionSummary,
            studentFeedbackByTutor: bookedSlot.studentFeedbackByTutor,
            topic: bookedSlot.topic
        }
        return resultData
    }


}


export const BookSlotsByTutor = async (body) => {
   
    let SessionDBDetails = body.sessionBookingDetails.map((item) => {
        return {
            studenUsercode: body.studenUsercode,
            Bookedby: body.Bookedby,
            tutorUsercode: body.tutorUsercode,
            sessionMaterial: body.sessionMaterial,
            sessionId: new ObjectId(),
            sessionDetails: body.sessionDetails,
            sessionSubject: body.sessionSubject,
            paymentStatus: body.paymentStatus,
            sessionLink: body.sessionLink,
            sessionStatus: body.sessionStatus,
            topic: "",
            homeworkStatus: "",
            sessionSummary: "",
            studentFeedbackByTutor: "",
            sessionBookingDetails: item
        }
    })

    const checkSlotExist = await getSessionDetails(body.sessionDetails)
    
    if (checkSlotExist) {
        let SessionCreated = await BookaSlotByStudent(SessionDBDetails)

        SessionCreated = await Promise.all(
            SessionCreated?.map(async (slot) => {

                const sessionDetails = await updateSlotBooked(slot.tutorUsercode, slot.sessionDetails, body.AllDate);

                return {
                    sessionId: slot.sessionId,
                    studenUsercode: slot.studenUsercode,
                    Bookedby: slot.Bookedby,
                    tutorUsercode: slot.tutorUsercode,
                    sessionMaterial: slot.sessionMaterial,
                    sessionDetails: slot.sessionDetails,
                    sessionSubject: slot.sessionSubject,
                    paymentStatus: slot.paymentStatus,
                    sessionLink: slot.sessionLink,
                    sessionStatus: slot.sessionStatus,
                    topic: slot.topic,
                    homeworkStatus: slot.homeworkStatus,
                    sessionSummary: slot.sessionSummary,
                    studentFeedbackByTutor: slot.studentFeedbackByTutor,
                    sessionBookingDetails: slot.sessionBookingDetails
                }


            })
        );

        return SessionCreated;

    } else {
        throw Error('Slot Not found')
    }




}


export const GetBookedSlotsService = async (body) => {
    const bookedSlots = await GetBookedSlotsofStudentDao(body)
    if (bookedSlots.length > 0) {

        const studentDetails = await fetchSingleStudentDetails(bookedSlots[0].studenUsercode);
      
        const resultDataArray = await Promise.all(
            bookedSlots.map(async (bookedSlot) => {

                const tutorDetails = await fetchSingleuser(bookedSlot.tutorUsercode);
              
               
                //const sessionDetails = await getSessionDetails(bookedSlot.sessionDetails, bookedSlot.sessionBookingDetails);

               
                const resultData = {
                    studenUsercode: bookedSlot.studenUsercode,
                    tutorUsercode: bookedSlot.tutorUsercode,
                    sessionId: bookedSlot.sessionId,
                    sessionMaterial: bookedSlot.sessionMaterial,
                    sessionBookingDetails: bookedSlot.sessionBookingDetails,
                    sessionDetails: bookedSlot.sessionDetails,
                    Bookedby: bookedSlot.Bookedby,
                    bookedAt: bookedSlot.createdAt,
                    homeworkStatus: bookedSlot.homeworkStatus,
                    paymentStatus: bookedSlot.paymentStatus,
                    sessionLink: bookedSlot.sessionLink,
                    sessionStatus: bookedSlot.sessionStatus,
                    sessionSubject: bookedSlot.sessionSubject,
                    sessionSummary: bookedSlot.sessionSummary,
                    studentFeedbackByTutor: bookedSlot.studentFeedbackByTutor,
                    topic: bookedSlot.topic,
                    studentName: studentDetails.name,
                    studentEmail: studentDetails.email,
                    tutorName: tutorDetails.name,
                    tutorEmail: tutorDetails.email,
                    StudentDetails: studentDetails,
                    tutorDetails: tutorDetails,
                };

                return resultData;
            })
        );

        return resultDataArray; 
    }
    return []

}


export const GetSlotsByService = async (body) => {


    const getSlots = await getSlotsForBooking(body.subject)
    if (getSlots.length > 0) {
        let userCodesList = []
        getSlots.map((tutor) => {
            userCodesList.push(tutor.userCode)
        })

        let slots = await getSlotsfromDb(userCodesList)

        slots = await Promise.all(
            slots?.map(async (slot) => {
                const tutor = await getSlots.find(t => t.userCode === slot.userCode);
             
                if (tutor) {
                    return {
                        slotId: slot._id,
                        slotDatails: slot,
                        tutorDetails: tutor
                    }
                }

            })
        );

        return slots;
    }
    return []


}