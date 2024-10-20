import BookedSlots from '../models/BookedSlots.js'
import TutorInfo from '../models/TutorInfo.js'
import TutorSlots from '../models/TutorSlots.js'

export const GetBookedSlotsofStudentDao = async (data) => {
    let searchQuery 
    if (data.type === "Student"){
        searchQuery={
            studenUsercode: data.studenUsercode
        }
    }

    if(data.type === "Tutor"){
        searchQuery = {
            tutorUsercode: data.tutorUsercode
        }
    }
    if (data.type === "Admin"){
        searchQuery = {
           
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

export const updateSlotDetails = async (Id, data) => {
    const updatedSlot = await BookedSlots.findOneAndUpdate({ sessionId: Id }, data, { upsert: true, new: true })
    if (updatedSlot) {
        return updatedSlot
    }
}


export const getSlotsForBooking = async (subject) => {
    const getTutor = await TutorInfo.find({ subjects: { $regex: new RegExp(`^${subject}$`, 'i') } },{_id:0,__v:0})

    return getTutor


}

export const getSlotsfromDb = async (userCodes) => {
    let slotList = await TutorSlots.find({ userCode: { $in: userCodes }, isAvailable: true, isBooked: false }, { __v: 0 });
    return slotList
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
