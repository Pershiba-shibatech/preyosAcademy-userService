import { getStudentLibrary, getTutorLibrary } from "./Library.service.js"


export const getTutorLibraryController = async (req, res) => {

    await getTutorLibrary(req.body).then((response) => {

        res.send({
            statusCode: 200,
            message: `Materials fetched Successfully!`,
            MaterialsCount : response.length,
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
export const getStudentLibraryController = async (req, res) => {

    await getStudentLibrary(req.body).then((response) => {

        res.send({
            statusCode: 200,
            message: `Materials fetched Successfully!`,
            MaterialsCount : response.length,
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