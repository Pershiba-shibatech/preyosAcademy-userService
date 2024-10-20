import { loginService } from "./LoginLogout.service.js"

export const loginController = async (req, res) => {
    await loginService(req.body).then((response) => {

        res.send({
            statusCode: 200,
            message: `User logged in Successfully!`,
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