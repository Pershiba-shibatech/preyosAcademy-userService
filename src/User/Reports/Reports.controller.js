//getAllSessionForReportDao

import { getAllSessionForReportServie } from "./Reports.service.js"

export const getAllSessionForReport = async (req, res) => {
    await getAllSessionForReportServie(req.query).then((response) => {

        res.send({
            statusCode: 200,
            message: `Reports fetched Successfully!`,
            count:response.length,
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