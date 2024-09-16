import tutorInfo from '../models/TutorInfo.js'
import TutorSlots from '../models/TutorSlots.js'

export const createTutorDao = async (data) => {
    const tutorDetails = await tutorInfo.create(data)
    if (tutorDetails) {
        return tutorDetails
    }
}

export const AddSlotsDao = async (data) => {
    const addSlots = await TutorSlots.findOneAndUpdate({ userCode: data.userCode }, data, { upsert: true, new: true })
    if (addSlots) {
        return addSlots
    }
}

export const fetchSingleuser = async (userCode) => {
    const tutorDetails = await tutorInfo.findOne({ userCode: userCode }, { firstName: 1, lastName: 1, userCode: 1, 
        tutorName: 1, subjects: 1, email: 1, phoneNumber: 1, experince:1,
         _id: 0})
    if (tutorDetails) {
        return tutorDetails
    }
}




