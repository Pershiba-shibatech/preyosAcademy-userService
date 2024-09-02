import tutorInfo from '../models/tutorInfo.js'

export const createTutorDao = async (data) => {
    const tutorDetails = tutorInfo.create(data)
    if (tutorDetails) {
        return tutorDetails
    }
}   