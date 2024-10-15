import { AddtutorSlotByAdminService, createTutorService, GetAllTutorsList } from "./Tutor.service.js"


export const createTutorController = async (req, res) => {
    await createTutorService(req.body).then((response) => {

        res.send({
            statusCode: 200,
            message: `${response.userType} created Successfully!`,
            result: [response]
        })

    }).catch((error) => {
        console.log(error.message)
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
} 

export const AddTutorSlotsByAdminController = async(req, res)=>{
    await AddtutorSlotByAdminService(req.body).then((response)=>{
        res.send({
            statusCode: 200,
            message: `Slot updated Successfully!`,
            result: [response]
        })
    }).catch((error)=>{
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}
export const getTutorsList = async(req, res)=>{
    await GetAllTutorsList(req.body).then((response)=>{
        res.send({
            statusCode: 200,
            message: `Tutors fetched Successfully!`,
            TutorsCount:response.length,
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