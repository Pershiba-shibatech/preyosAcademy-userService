import StudentInfo from "../models/StudentInfo.js";
import tutorInfo from "../models/TutorInfo.js"


export const LoginDao = async (email, type) => {
    if (type === 1) {
        let TutorDetails = await tutorInfo.findOne({ email: email }, { _id: 0, __v: 0 }).lean();

        if (TutorDetails) {
            return TutorDetails
        }
    } else {
        let StudentDetails = await StudentInfo.findOne({ email: email }, { _id: 0, __v: 0 }).lean()
        if (StudentDetails) {
            return StudentDetails
        }
    }

}