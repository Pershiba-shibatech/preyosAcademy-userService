import { BookaSlotByStudent, BookaSlotForReschedule, GetBookedSlotsofStudentDao, getParticularSession, GetPastSlots, getSlotsForBooking, getSlotsfromDb, updateSlotDetails, updateStatusDao } from "../../Dao/BookedSlotsDao.js";
import { AddMaterialDao } from "../../Dao/Library.js";
import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js";
import { addSingleSlot, fetchSingleuser, InserSlotsDao } from "../../Dao/TutorDao.js";
import { getSessionDetails, updateBookedStatus, updateSlotBooked, updateSlotForStatusBooked } from "../../Dao/Tutorslots.js";
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
            sessionBoardLink: body.sessionBoardLink,
            sessionStatus: body.sessionStatus,
            topic: "",
            homeworkStatus: "",
            sessionSummary: "",
            studentFeedbackByTutor: "",
            sessionBookingDetails: item,
            month: body.month
        }
    })
    const Material = {
        studenUsercode: body.studenUsercode,
        sessionMaterial: body.sessionMaterial,
        tutorUsercode: body.tutorUsercode,
        sessionDetails: body.sessionDetails,
        sessionSubject: body.sessionSubject
    }
    const checkSlotExist = await getSessionDetails(body.sessionDetails)

    if (checkSlotExist) {

        // let SessionCreated = await BookaSlotByStudent(SessionDBDetails)
        // let AddMaterialToLibrary = await AddMaterialDao(Material)
        let AddMaterialToLibrary;
        if (body.sessionMaterial.url !== "") {
            AddMaterialToLibrary = await AddMaterialDao(Material)
        }
        let SessionCreated = await BookaSlotByStudent(SessionDBDetails)
        // let [SessionCreated, AddMaterialToLibrary] = await Promise.all([
        //     BookaSlotByStudent(SessionDBDetails),
        //     AddMaterialDao(Material)
        // ]);
        SessionCreated = await Promise.all(
            SessionCreated?.map(async (slot) => {
                const sessionDetails = await updateSlotBooked(slot.tutorUsercode, slot.sessionDetails, body.AllDate, body.month);
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
    const currentTimestamp = new Date().getTime();
    if (bookedSlots.length > 0) {



        const resultDataArray = await Promise.all(
            bookedSlots.map(async (bookedSlot) => {

                const tutorDetails = await fetchSingleuser(bookedSlot.tutorUsercode);
                const studentDetails = await fetchSingleStudentDetails(bookedSlot.studenUsercode);

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
                    studentName: studentDetails.studentName,
                    studentEmail: studentDetails.email,
                    tutorName: tutorDetails.tutorName,
                    tutorEmail: tutorDetails.email,
                    StudentDetails: studentDetails,
                    tutorDetails: tutorDetails,
                    sessionBoardLink: bookedSlot.sessionBoardLink
                };

                return resultData;
            })
        );

        const filteredResultDataArray = resultDataArray.filter((session) => {
            const sessionTimestamp = parseInt(session.sessionBookingDetails.timeStamp, 10); // Parse the session timeStamp
            return sessionTimestamp >= currentTimestamp; // Keep sessions that are for today or future dates
        });

        return filteredResultDataArray;
    }
    return []

}
export const GetBookedpastSlotsService = async (body) => {
    const bookedSlots = await GetPastSlots(body)
    // const currentTimestamp = new Date().getTime();
    if (bookedSlots.length > 0) {



        const resultDataArray = await Promise.all(
            bookedSlots.map(async (bookedSlot) => {

                const tutorDetails = await fetchSingleuser(bookedSlot.tutorUsercode);
                const studentDetails = await fetchSingleStudentDetails(bookedSlot.studenUsercode);

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
                    studentName: studentDetails.studentName,
                    studentEmail: studentDetails.email,
                    tutorName: tutorDetails.tutorName,
                    tutorEmail: tutorDetails.email,
                    StudentDetails: studentDetails,
                    tutorDetails: tutorDetails,
                    sessionBoardLink: bookedSlot.sessionBoardLink
                };

                return resultData;
            })
        );

        // const filteredResultDataArray = resultDataArray.filter((session) => {
        //     const sessionTimestamp = parseInt(session.sessionBookingDetails.timeStamp, 10); // Parse the session timeStamp
        //     return sessionTimestamp <= currentTimestamp; // Keep sessions that are for today or future dates
        // });

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

        let slots = await getSlotsfromDb(userCodesList, body.month)

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


export const updateSlotService = async (body) => {

    const getbookedSession = await getParticularSession(body.sessionId);
    const getTutorSlotDetail = await getSessionDetails(getbookedSession.sessionBookingDetails.id)
    let filteredBookedDate = getTutorSlotDetail.bookedData.filter((slot) => slot !== getbookedSession.sessionBookingDetails.date)


    if (getbookedSession) {
        if (body.sessionStatus === "completed") {
            let sessionDetails = {
                sessionStatus: body.sessionStatus,
                topic: body.topic,
                homeworkStatus: body.homeworkStatus,
                sessionSummary: body.sessionSummary,
                studentFeedbackByTutor: body.studentFeedbackByTutor
            }


            const updatedStatus = await updateStatusDao(getbookedSession.sessionId, sessionDetails)
            const updateOldSlotDetail = await updateSlotForStatusBooked(getbookedSession.sessionBookingDetails.id, filteredBookedDate, getbookedSession.month);

            return updatedStatus
        }
        if (body.sessionStatus === 'reschedule') {


            let sessionDetails = {
                sessionStatus: body.sessionStatus,
                rescheduleReason: body.rescheduleReason,
                rescheduledBy: body.rescheduledBy
            }
            let tempSessionDetails = {
                userCode: body.tutorSlotDetails.userCode,
                day: body.tutorSlotDetails.day,
                from: body.tutorSlotDetails.from,
                to: body.tutorSlotDetails.To,
                isAvailable: true,
                isBooked: false,
                bookedData: [],
                addSlots: [],
                isTemp: true,
                availableMonth: {
                    Jan: "0",
                    Feb: "0",
                    Mar: "0",
                    Apr: "0",
                    May: "0",
                    Jun: "0",
                    Jul: "0",
                    Aug: "0",
                    Sep: "0",
                    Oct: "0",
                    Nov: "0",
                    Dec: "0"
                }

            }
            const updatedStatus = await updateStatusDao(getbookedSession.sessionId, sessionDetails)

            const addSlots = await addSingleSlot(tempSessionDetails)

            if (addSlots) {
                let bookSlot = {
                    studenUsercode: getbookedSession.studenUsercode,
                    Bookedby: body.rescheduledBy,
                    tutorUsercode: getbookedSession.tutorUsercode,
                    sessionMaterial: getbookedSession.sessionMaterial,
                    sessionId: new ObjectId(),
                    sessionDetails: addSlots._id,
                    sessionSubject: getbookedSession.sessionSubject,
                    paymentStatus: getbookedSession.paymentStatus,
                    sessionLink: getbookedSession.sessionLink,
                    sessionBoardLink: getbookedSession.sessionBoardLink,
                    sessionStatus: "Yettojoin",
                    topic: "",
                    homeworkStatus: "",
                    sessionSummary: "",
                    studentFeedbackByTutor: "",
                    month: body.month,
                    sessionBookingDetails: {
                        from: addSlots.from,
                        to: addSlots.to,
                        day: addSlots.day,
                        date: body.tutorSlotDetails.date,
                        timeStamp: body.tutorSlotDetails.timeStamp,
                        id: addSlots._id,
                    }
                }

                const updateOldSlotDetail = await updateSlotForStatusBooked(getbookedSession.sessionBookingDetails.id, filteredBookedDate, getbookedSession.month);

                const RescheduleSlot = await BookaSlotForReschedule(bookSlot)
                return RescheduleSlot;
            }


        }
        if (body.sessionStatus === 'cancelled') {

            let sessionDetails = {
                sessionStatus: body.sessionStatus,
                cancelReason: body.cancelReason,
                cancelledBy: body.cancelledBy
            }
            const updateOldSlotDetail = await updateSlotForStatusBooked(getbookedSession.sessionBookingDetails.id, filteredBookedDate, getbookedSession.month);

            const updatedStatus = await updateStatusDao(getbookedSession.sessionId, sessionDetails)
            return updatedStatus

        }

    }



};

export const GetSinglesessionDetailsSerice = async (query) => {

    const getbookedSession = await getParticularSession(query.sessionId);
    if (getbookedSession) {
        const TutorDetails = await fetchSingleuser(getbookedSession.tutorUsercode)
        const StudentDetails = await fetchSingleStudentDetails(getbookedSession.studenUsercode)
        return { slotDetails: getbookedSession, tutorDetails: TutorDetails, studentDetails: StudentDetails }
    } else {
        throw Error('unable to fetch session Details')
    }
}