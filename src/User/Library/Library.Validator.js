import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js"
import { fetchSingleuser } from "../../Dao/TutorDao.js"



export const getTutorLibraryValidator = async (body) => {
    const { userCode } = body
    let TutorDetails = await fetchSingleuser(userCode)
    if (!TutorDetails) {
        throw Error("Invalid User")
    }
    return TutorDetails
}
export const getStudentLibraryValidator = async (body) => {
    const { userCode } = body
    let StudentDetails = await fetchSingleStudentDetails(userCode)
    if (!StudentDetails) {
        throw Error("Invalid User")
    }
    return StudentDetails
}