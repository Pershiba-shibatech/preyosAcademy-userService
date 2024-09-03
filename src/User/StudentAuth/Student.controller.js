import { createStudentService, getAvailableSlotsForStudent } from "./Student.service.js"

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

