import { GetBookedSlotsofStudentDao, updateSlotDetails } from "../../Dao/BookedSlotsDao.js";
import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js";
import { fetchSingleuser } from "../../Dao/TutorDao.js";
import { getSessionDetails, updateBookedStatus } from "../../Dao/Tutorslots.js";
import { uploadFile } from "./BookSlots.Validator.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const BookSlotsByStudentService = async (body, file) => {
    console.log(file, "file")
    const sessionId = new ObjectId();
    let fileUploadData
    if (file.hasOwnProperty('sessionMaterial')) {
        let filepath = file.sessionMaterial[0].filepath

        if (!filepath) {
            throw new Error('No files uploaded or invalid file path.');
        }

        fileUploadData = await uploadFile(filepath, sessionId, body.studenUsercode)

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


export const GetBookedSlotsByStudentService = async (body) => {
    const bookedSlots = await GetBookedSlotsofStudentDao(body.studenUsercode)
    if (bookedSlots.length > 0) {

        const studentDetails = await fetchSingleStudentDetails(bookedSlots[0].studenUsercode);
        // Use Promise.all to wait for all the async operations inside the map
        const resultDataArray = await Promise.all(
            bookedSlots.map(async (bookedSlot) => {

                const tutorDetails = await fetchSingleuser(bookedSlot.tutorUsercode);
                console.log(bookedSlot.sessionDetails, "sessionDetails")
                // Fetch session details using sessionDetails or sessionId
                const sessionDetails = await getSessionDetails(bookedSlot.sessionDetails, bookedSlot.sessionBookingDetails);

                // Construct the result data for each booked slot
                const resultData = {
                    studenUsercode: bookedSlot.studenUsercode,
                    StudentDetails: studentDetails,
                    tutorUsercode: bookedSlot.tutorUsercode,
                    tutorDetails: tutorDetails,
                    sessionId: bookedSlot.sessionId,
                    sessionMaterial: bookedSlot.sessionMaterial,
                    sessionBookingDetails: sessionDetails,
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
                    tutorEmail: tutorDetails.email
                };

                return resultData;
            })
        );

        return resultDataArray; // Return the array with all the results
    }

}