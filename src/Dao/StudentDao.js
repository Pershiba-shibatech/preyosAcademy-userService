import StudentInfo from '../models/StudentInfo.js'
import TutorSlots from '../models/TutorSlots.js'


export const createStudentDao = async (data) => {
    const studentDetails = StudentInfo.create(data)
    if (studentDetails) {
        return studentDetails
    }
}   

export const getStudentAvailableSlots = async(data)=>{
   
    let AvailableSlots;

  
    let query = {};


    if (!data.isAll) {
        query.userCode = data.userCode; 
    }

 
    if (data.subjects && Array.isArray(data.subjects) && data.subjects.length > 0) {
        query.subjects = { $in: data.subjects };
    }
  

    
    AvailableSlots = await TutorSlots.find(query);

    return AvailableSlots;
}

export const fetchSingleStudentDetails = async (data) => {
    const getStudentDetails = StudentInfo.findOne({ userCode: data }, {
        firstName: 1, lastName: 1, userCode: 1, mail: 1, phoneNumber: 1, timeZone: 1,
        grade: 1, studentName: 1, parentName: 1, Requirements: 1, Coordinator: 1, _id: 0
    })
    return getStudentDetails
}


export const getStudentList=async()=>{
    const StudentList = await StudentInfo.find({},{_id:0,__v:0})
    return StudentList
}