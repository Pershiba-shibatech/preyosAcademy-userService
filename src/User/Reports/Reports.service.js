import { getAllSessionForReportDao } from "../../Dao/BookedSlotsDao.js";
import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js";
import { fetchSingleuser } from "../../Dao/TutorDao.js";
import { reportValidator } from "./Reports.Validator.js";

export const getAllSessionForReportServie = async (body) => {
    await reportValidator(body);
    const bookedSlots = await getAllSessionForReportDao(body?.student ?? "", body?.subject ?? "");
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

        // const filteredResultDataArray = resultDataArray.filter((session) => {
        //     const sessionTimestamp = parseInt(session.sessionBookingDetails.timeStamp, 10); // Parse the session timeStamp
        //     return sessionTimestamp >= currentTimestamp; // Keep sessions that are for today or future dates
        // });

        return resultDataArray;
    }
    return []

}