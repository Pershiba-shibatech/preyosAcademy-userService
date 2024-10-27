import TutorInfo from '../models/TutorInfo.js'
import TutorSlots from '../models/TutorSlots.js'

export const createTutorDao = async (data) => {

    const tutorDetails = await TutorInfo.create(data)
    if (tutorDetails) {
        return tutorDetails
    }
}

export const fetchByEmail = async (data) => {
    const tutorDetails = await TutorInfo.find({ email: data })
    return tutorDetails
}

export const AddSlotsDao = async (data) => {
    const addSlots = await TutorSlots.findOneAndUpdate({ userCode: data.userCode }, data, { upsert: true, new: true })
    if (addSlots) {
        return addSlots
    }
}


export const fetchSingleuser = async (userCode) => {
    const tutorDetails = await TutorInfo.findOne({ userCode: userCode }, {
        firstName: 1, lastName: 1, userCode: 1,email:1,
        tutorName: 1, subjects: 1, email: 1, phoneNumber: 1, experince: 1, timeZone: 1, userType: 1,
        _id: 0
    })
    if (tutorDetails) {
        return tutorDetails
    }
}

export const getTutorsList = async () => {
    const TutorsList = await TutorInfo.find({}, { _id: 0, __v: 0 })
    return TutorsList
}




export const InserSlotsDao = async (data) => {
    const addSlots = await TutorSlots.insertMany(data)
    if (addSlots) {
        return addSlots
    }
}

export const addSingleSlot = async (data) => {
    const addSlots = await TutorSlots.create(data)
    if (addSlots) {
        return addSlots
    }
}
