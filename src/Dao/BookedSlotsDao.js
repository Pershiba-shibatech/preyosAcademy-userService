import BookedSlots from '../models/BookedSlots.js'
import TutorInfo from '../models/TutorInfo.js'
import TutorSlots from '../models/TutorSlots.js'

export const GetBookedSlotsofStudentDao = async (data) => {
    let searchQuery
    if (data.type === "Student") {
        searchQuery = {
            studenUsercode: data.studenUsercode,
            sessionStatus: "Yettojoin"
        }
    }

    if (data.type === "Tutor") {
        searchQuery = {
            tutorUsercode: data.tutorUsercode,
            sessionStatus: "Yettojoin"
        }
    }
    if (data.type === "Admin") {
        searchQuery = {

            sessionStatus: "Yettojoin"
        }
    }
    const StudentBookedSlots = await BookedSlots.find(searchQuery).sort({ "sessionBookingDetails.timeStamp" :1})
    return StudentBookedSlots

}
export const GetPastSlots = async (data) => {
    let searchQuery
    if (data.type === "Student") {
        searchQuery = {
            studenUsercode: data.studenUsercode,
            sessionStatus: { $ne: "Yettojoin" }

        }
    }

    if (data.type === "Tutor") {
        searchQuery = {
            tutorUsercode: data.tutorUsercode,
            sessionStatus: { $ne: "Yettojoin" }
        }
    }
    if (data.type === "Admin") {
        searchQuery = {

            sessionStatus: { $ne: "Yettojoin" }
        }
    }
    const StudentBookedSlots = await BookedSlots.find(searchQuery)
    return StudentBookedSlots

}

export const BookaSlotByStudent = async (data) => {

    const bookSlot = await BookedSlots.insertMany(data)
    if (bookSlot) {

        return bookSlot
    }
}
export const BookaSlotForReschedule = async (data) => {

    const bookSlot = await BookedSlots.create(data)
    if (bookSlot) {

        return bookSlot
    }
}

export const updateSlotDetails = async (Id, data) => {
    const updatedSlot = await BookedSlots.findOneAndUpdate({ sessionId: Id }, data, { upsert: true, new: true })
    if (updatedSlot) {
        return updatedSlot
    }
}


export const getSlotsForBooking = async (subject) => {
    const getTutor = await TutorInfo.find({ subjects: { $regex: new RegExp(`^${subject}$`, 'i') } }, { _id: 0, __v: 0 })

    return getTutor


}

export const getSlotsfromDb = async (userCodes, month) => {

    // Construct the query
    let slotList = await TutorSlots.find({
        userCode: { $in: userCodes },
        isTemp: false,
        // isBooked: false,
        [`availableMonth.${month}`]: '0'
    }, { __v: 0 });


    return slotList
}


export const getParticularSession = async (sessionId) => {

    let slotList = await BookedSlots.findOne({ sessionId: sessionId })
    return slotList

}

export const updateStatusDao = async (sessionId, data) => {
    const slotDetails = await BookedSlots.findOneAndUpdate({ sessionId: sessionId }, data, { new: true });
    return slotDetails
}

export const updateSessionLink = async (sessionId, data) => {
    const slotDetails = await BookedSlots.findOneAndUpdate({ sessionId: sessionId }, { $set: { sessionLink: data.sessionLink, sessionBoardLink: data.sessionBoardLink } }, { new: true })
    return slotDetails
}
// export const getSlotsForBooking = async (subject) => {
//     const slotsWithTutors = await TutorInfo.aggregate([
//         // Match tutors who have the specific subject
//         {
//             $match: { subjects: subject }
//         },

//         // Perform a lookup to join with tutorsSlot based on userCode
//         {
//             $lookup: {
//                 from: 'tutorSlots',         // Ensure collection name is correct
//                 localField: 'userCode',     // Field in TutorInfo
//                 foreignField: 'userCode',   // Field in tutorsSlot
//                 as: 'slotDetails'           // The output field to store the matched slots
//             }
//         },

//         // Project to include both tutor and slot details
//         {
//             $project: {
//                 tutorDetails: '$$ROOT',    // Include all fields from the TutorInfo (tutor details)
//                 slotDetails: 1             // Include the slotDetails (all fields)
//             }
//         }
//     ]);

//     return slotsWithTutors;
// };
