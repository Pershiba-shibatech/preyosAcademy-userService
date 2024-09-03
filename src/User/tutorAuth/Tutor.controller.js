import { AddtutorSlotByAdminService, createTutorService } from "./Tutor.service.js"


export const createTutorController = async (req, res) => {
    await createTutorService(req.body).then((response) => {

        res.send({
            statusCode: 200,
            message: `${response.userType} created Successfully!`,
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