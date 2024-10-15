import { AddSlotsDao, createTutorDao, fetchByEmail, getTutorsList } from "../../Dao/TutorDao.js";
import { createtutorvalidator } from "./Tutor.Validator.js";

export const createTutorService = async (body) => {

    await createtutorvalidator(body);
  
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
        paymentMethod: "Bank Transfer",
        userType: body.userType,
        Coordinator: body.Coordinator,
        logInDetails: { lastLogged: "", isLoggedIn: false },
        Dob:body.Dob,
        Qualification:body.Qualification

    }
    const checkAvailable = await fetchByEmail(body.email)
    if(checkAvailable.length>0){
         throw new Error(`Tutor already exist with the same email`);
    }
    let tutorDetails = await createTutorDao(tutorData)
    if (tutorDetails) {
        let responseData = {
            userCode: tutorDetails.userCode,
            firstName: tutorDetails.firstName,
            lastName: tutorDetails.lastName,
            tutorName: tutorDetails.tutorName,
            subjects: tutorDetails.subjects,
            experince: tutorDetails.experince,
            Address: tutorDetails.Address,
            AccountDetails: tutorDetails.AccountDetails,
            phoneNumber: tutorDetails.phoneNumber,
            countryCode: tutorDetails.countryCode,
            phoneWithoutCountryCode: tutorDetails.phoneWithoutCountryCode,
            email: tutorDetails.email,
            password: tutorDetails.password,
            timeZone: tutorDetails.timeZone,
            paymentMethod: "Bank Transfer",
            userType: tutorDetails.userType,
            Coordinator: tutorDetails.Coordinator,
            logInDetails: tutorDetails.logInDetails
        }
        return responseData
    }
}


export const AddtutorSlotByAdminService = async (body) => {

    const availableSlot = {
        userCode: body.userCode,
        subjects:body.subjects,
        Monday: body.Monday,
        Tuesday: body.Tuesday,
        Wednesday: body.Wednesday,
        Thursday: body.Thursday,
        Friday: body.Friday,
        Saturday: body.Saturday,
        Sunday: body.Sunday
    }
    const Slots = await AddSlotsDao(availableSlot)
    if (Slots) {
        let SlotList ={
            userCode: Slots.userCode,
            subjects:Slots.subjects,
            Monday: Slots.Monday,
            Tuesday: Slots.Tuesday,
            Wednesday: Slots.Wednesday,
            Thursday: Slots.Thursday,
            Friday: Slots.Friday,
            Saturday: Slots.Saturday,
            Sunday: Slots.Sunday
        }
        return SlotList
    }
}


export const GetAllTutorsList =async()=> {
  let tutorsList = await getTutorsList()
  return tutorsList
}