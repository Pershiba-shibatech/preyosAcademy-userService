import { createStudentService, deleteStudentService, GetAllStudentList, getAvailableSlotsForStudent } from "./Student.service.js"

export const createStudentController=async(req, res)=>{
 
    await createStudentService(req.body).then((response)=>{

        res.send({
            statusCode: 200,
            message: `Student created Successfully!`,
            result: [response]
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })

  
}
export const deleteStudentController =async(req, res)=>{
 
    await deleteStudentService(req.body).then((response)=>{

        res.send({
            statusCode: 200,
            message: `Student Deleted Successfully!`,
            result: []
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })

  
}

export const getAvailableSlotsForStudentController=async(req, res)=>{
 
    await getAvailableSlotsForStudent(req.body).then((response)=>{

        res.send({
            statusCode: 200,
            message: `Available slots fetched SuccessFully`,
            result: [response]
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })

  
}

export const getStudentsList = async(req, res)=>{
    await GetAllStudentList(req.body).then((response)=>{
        res.send({
            statusCode: 200,
            message: `Student fetched Successfully!`,
            studentsCount:response.length,
            result: response
         
        })
    }).catch((error)=>{
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}