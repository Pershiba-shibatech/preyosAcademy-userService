import { updateSlotDetails } from "../../Dao/BookedSlotsDao.js";
import { uploadFile } from "./BookSlots.Validator.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
export const BookSlotsByStudentService = async (body, file) => {
    console.log(body)
    let filepath = file.sessionMaterial[0].filepath

    if (!filepath) {
        throw new Error('No files uploaded or invalid file path.');
    }
    const sessionId = new ObjectId();
    const fileUploadData = await uploadFile(filepath, sessionId, body.studenUsercode)
    console.log(fileUploadData, "filepath")

    const BookSlotData = {
        studenUsercode: body.studenUsercode,
        Bookedby: body.Bookedby,
        tutorUsercode: body.tutorUsercode,

        sessionMaterial: {
            url: fileUploadData.url,

            display_name: fileUploadData.display_name,
            format: fileUploadData.format
        },

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