import { getLibraryDaoOfTutorDao } from "../../Dao/Library.js"
import { fetchSingleStudentDetails } from "../../Dao/StudentDao.js";
import { fetchSingleuser } from "../../Dao/TutorDao.js";
import { getTutorLibraryValidator } from "./Library.Validator.js";

export const getTutorLibrary = async (body) => {
    const tutorsDetail = await getTutorLibraryValidator(body)
    let libraryData = await getLibraryDaoOfTutorDao(body.userCode, tutorsDetail)
    if (libraryData.length > 0) {
        libraryData = await Promise.all(
            libraryData.map(async (library) => {
                const StudentDetail = await fetchSingleStudentDetails(library.studenUsercode);
                return {
                    materialId: library._id,
                    studentDetails: StudentDetail,
                    tutorsDetail: tutorsDetail,
                    sessionMaterial: library.sessionMaterial,
                    sessionSubject: library.sessionSubject
                };
            })
        );
        return libraryData
    }
    return []
}

export const getStudentLibrary = async (body) => {
    const StudentDetail = await getStudentLibraryValidator(body)
    let libraryData = await getLibraryDaoOfStudentDao(body.userCode)
    if (libraryData.length > 0) {
        libraryData = await Promise.all(
            libraryData.map(async (library) => {

                const tutorDetails = await fetchSingleuser(body.tutorUsercode)
                return {
                    materialId: library._id,
                    studentDetails: StudentDetail,
                    tutorsDetail: tutorDetails,
                    sessionMaterial: library.sessionMaterial,
                    sessionSubject: library.sessionSubject
                };
            })
        );
        return libraryData
    }
    return []
}