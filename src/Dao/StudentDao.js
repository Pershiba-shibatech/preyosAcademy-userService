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