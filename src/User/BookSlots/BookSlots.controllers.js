import { BookSlotsByStudentService, BookSlotsByTutor, GetBookedSlotsService, GetSlotsByService, updateSlotService, GetSinglesessionDetailsSerice, GetBookedpastSlotsService, updateSlotLinkService, GetSingleSlotsAvailable, getAvailableStatus, BookSingleSlotsByTutor } from "./BookSlots.service.js"

export const BookSlotsbyTutorController = async (req, res) => {

    await BookSlotsByTutor(req.body, req.files).then((response) => {

        res.send({
            statusCode: 200,
            message: `Slot booked Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}
export const BookSingleSlotsbyTutorController = async (req, res) => {

    await BookSingleSlotsByTutor(req.body, req.files).then((response) => {

        res.send({
            statusCode: 200,
            message: `Single Slot booked Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}
export const BookSlotsbyV1Controller = async (req, res) => {

    await BookSlotsByStudentService(req.body, req.files).then((response) => {

        res.send({
            statusCode: 200,

            message: `Slot booked Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}

export const GetBookedSlotsController = async (req, res) => {
    await GetBookedSlotsService(req.body).then((response) => {
        res.send({
            statusCode: 200,
            type: req.body.type,
            message: `Slot fetched Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}
export const GetBookedpastSlotsController = async (req, res) => {
    await GetBookedpastSlotsService(req.body).then((response) => {
        res.send({
            statusCode: 200,
            type: req.body.type,
            message: `Slot fetched Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}
export const GetSinglesessionDetails = async (req, res) => {
    await GetSinglesessionDetailsSerice(req.query).then((response) => {
        res.send({
            statusCode: 200,
            message: `Slot fetched Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}


export const GetSlotsController = async (req, res) => {
    await GetSlotsByService(req.body).then((response) => {
        res.send({
            statusCode: 200,
            numberOfSlots: response.length,
            message: `Slot fetched Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}

export const GetSingleSlotsController = async (req, res) => {
    await GetSingleSlotsAvailable(req.body).then((response) => {
        res.send({
            statusCode: 200,
            numberOfSlots: response.length,
            message: `Available Slot fetched Successfully!`,
            result: response
        })

    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}


export const updateSlotStatus = async (req, res) => {
    await updateSlotService(req.body).then((response) => {
        res.send({
            statusCode: 200,
            message: `Slot status updated  successfully!`,
            result: response
        })
    }).catch((error) => {

        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}

export const updateSlotsLink = async (req, res) => {
    await updateSlotLinkService(req.body).then((response) => {
        res.send({
            statusCode: 200,
            message: `Slot status updated  successfully!`,
            result: response
        })
    }).catch((error) => {

        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })
}

export const getAvailableStatusController = async (req, res) => {

    await getAvailableStatus(req.body).then((response) => {
        res.send({
            statusCode: 200,
            message: `Slot status fetched  successfully!`,
            isAvailable: !response ? true : false,
            result: !response ? [] : [response]
        })
    }).catch((error) => {
        res.send({
            statusCode: 500,
            message: error.message,
            result: []
        })
    })

}