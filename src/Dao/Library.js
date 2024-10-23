import Library from '../models/Library.js'

export const AddMaterialDao = async (data) => {
    const createLibrary = await Library.create(data)
    return createLibrary
}

export const getLibraryDaoOfStudentDao = async (data) => {
    const getStudentLibrary = await Library.find({ studenUsercode: data }, { _id: 1, studenUsercode: 1, sessionMaterial: 1, tutorUsercode: 1, sessionSubject: 1 })
    return getStudentLibrary
}
export const getLibraryDaoOfTutorDao = async (data, tutorsDetail) => {
   
    if (tutorsDetail.userType === "Admin") {
        const getTutorLibrary = await Library.find({}, { _id: 1, studenUsercode: 1, sessionMaterial: 1, tutorUsercode: 1, sessionSubject: 1 }).lean()
        return getTutorLibrary
    } else {
        const getTutorLibrary = await Library.find({ tutorUsercode: data }, { _id: 1, studenUsercode: 1, sessionMaterial: 1, tutorUsercode: 1, sessionSubject: 1 })
        return getTutorLibrary
    }

}