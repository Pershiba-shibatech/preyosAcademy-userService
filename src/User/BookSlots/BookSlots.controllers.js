import { BookSlotsByStudentService } from "./BookSlots.service.js"

export const BookSlotsbyStudentController = async(req,res)=>{

    await BookSlotsByStudentService(req.body, req.files).then((response) => {

        res.send({
            statusCode: 200,
            message: `Slot booked Successfully!`,
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