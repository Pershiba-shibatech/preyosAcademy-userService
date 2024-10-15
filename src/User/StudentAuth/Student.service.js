import moment from "moment"
import { createStudentDao, fetchstudentByEmail, getStudentAvailableSlots, getStudentList } from "../../Dao/StudentDao.js"
import { createStudentValidator } from "./Student.Validator.js"
import { fetchSingleuser } from "../../Dao/TutorDao.js"



export const createStudentService = async (body) => {

    await createStudentValidator(body)
    const studentData = {

        firstName: body.firstName,
        lastName: body.lastName,
        studentName: body.studentName,
        parentName: body.parentName,
        subjects: body.subjects,
        grade: body.grade,
        Requirements: body.Requirements,
        Address: body.Address,
        AccountDetails: body.AccountDetails,
        phoneNumber: `${body.countryCode}${body.phoneNumber}`,
        countryCode: body.countryCode,
        phoneWithoutCountryCode: body.phoneNumber,
        email: body.email,
        password: body.password,
        timeZone: body.timeZone,
        paymentMethod: "Bank Transfer",
        userType: body.userType,
        Coordinator: body.Coordinator,
        Dob:body.Dob,
        logInDetails: { lastLogged: "", isLoggedIn: false }
    }
    const checkAvailable = await fetchstudentByEmail(body.email)
    if(checkAvailable.length>0){
         throw new Error(`Student already exist with the same email`);
    }

    let studentDetails = await createStudentDao(studentData)
    if (studentDetails) {
        let responseData = {
            userCode: studentDetails.userCode,
            firstName: studentDetails.firstName,
            lastName: studentDetails.lastName,
            studentName: studentDetails.studentName,
            parentName: studentDetails.studentName,
            subjects: studentDetails.subjects,
            grade: studentDetails.grade,
            Requirements: studentDetails.Requirements,
            Address: studentDetails.Address,
            AccountDetails: studentDetails.AccountDetails,
            phoneNumber: studentDetails.phoneNumber,
            countryCode: studentDetails.countryCode,
            phoneWithoutCountryCode: studentDetails.phoneWithoutCountryCode,
            email: studentDetails.email,
            password: studentDetails.password,
            timeZone: studentDetails.timeZone,
            paymentMethod: studentDetails.paymentMethod,
            userType: studentDetails.userType,
            Coordinator: studentDetails.Coordinator,
            logInDetails: studentDetails.logInDetails
        }
        return responseData
    }
}

export const getAvailableSlotsForStudent = async (data) => {

    let AddSlotsDataFromDb = await getStudentAvailableSlots(data);
    if (AddSlotsDataFromDb) {
        let Day;
        let timestamps
        if (data.day === 0) {
            Day = moment().format('dddd');
            timestamps=moment().format('x')
        } else {
            Day = moment(data.day).format('dddd')
      
            timestamps = data.day
        }

        let newAddSlotsDataFromDb = await Promise.all(AddSlotsDataFromDb.map(async (slots) => {
            let filterSlots = await slots[Day].filter((slot) => slot.isAvailable && !slot.isBooked);
            const tutorDetails = await fetchSingleuser(slots.userCode)
            return {
                tutorDetails: tutorDetails,
                subjects: slots.subjects,
                availableSlots: filterSlots
            };
        }));

        let groupedBySubjects = {};

        newAddSlotsDataFromDb.forEach(({ tutorDetails, subjects, availableSlots }) => {
            subjects.forEach((subject) => {
                if (!groupedBySubjects[subject]) {
                    groupedBySubjects[subject] = [];
                }
                groupedBySubjects[subject].push({
                    Tutor: tutorDetails,
                    Date: moment(timestamps).format("MMM Do YY"),
                    timestamps: timestamps,
                    slots: availableSlots
                });
            });
        });

        return groupedBySubjects;
    }

    return {};

}


export const GetAllStudentList =async()=> {
    let studentList = await getStudentList()
    studentList = await Promise.all(studentList.map(async (studentDetails) => {
        // Fetch tutorDetails for each student
        const tutorDetails = await fetchSingleuser(studentDetails.Coordinator);
        // Return the student object with an additional `coordinator` property
        return {
            userCode: studentDetails.userCode,
            firstName: studentDetails.firstName,
            lastName: studentDetails.lastName,
            studentName: studentDetails.studentName,
            parentName: studentDetails.studentName,
            subjects: studentDetails.subjects,
            grade: studentDetails.grade,
            Requirements: studentDetails.Requirements,
            Address: studentDetails.Address,
            AccountDetails: studentDetails.AccountDetails,
            phoneNumber: studentDetails.phoneNumber,
            countryCode: studentDetails.countryCode,
            phoneWithoutCountryCode: studentDetails.phoneWithoutCountryCode,
            email: studentDetails.email,
            password: studentDetails.password,
            timeZone: studentDetails.timeZone,
            paymentMethod: studentDetails.paymentMethod,
            userType: studentDetails.userType,
            Coordinator: tutorDetails,
            logInDetails: studentDetails.logInDetails,       
          
        };
      }));
     
    return studentList
  }