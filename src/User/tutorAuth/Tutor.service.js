import { createTutorDao } from "../../Dao/TutorDao.js";

export const createTutorService = async (body) => {

    //await createtutorvalidator(body);
  
    const tutorData = {
        firstName: body.firstName,
        lastName: body.lastName,
        tutorName: body.tutorName,
        subjects: body.subjects,
        experince: body.experince,
        Address: body.Address,
        AccountDetails: body.AccountDetails,
        phoneNumber: `${body.countryCode}${body.phoneNumber}`,
        countryCode: body.countryCode,
        phoneWithoutCountryCode: body.phoneNumber,
        email: body.email,
        password: body.password,
        timeZone: body.timeZone,
        paymentMethod: body.paymentMethod,
        PaymentList: [],
        userType: body.userType,
        slotsAvailable: body.slotsAvailable,
        Coordinator: {},
        logInDetails: {}

    }
    let tutorDeails = await createTutorDao(tutorData)
    if (tutorDeails) {
        return tutorDeails
    }
}
