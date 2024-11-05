import { AddSlotsDao, createTutorDao, fetchByEmail, fetchSingleuser, getTutorsList, InserSlotsDao } from "../../Dao/TutorDao.js";
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
        Dob: body.Dob,
        Qualification: body.Qualification

    }
    const checkAvailable = await fetchByEmail(body.email)
    if (checkAvailable.length > 0) {
        throw new Error(`Tutor already exist with the same email`);
    }
    let tutorDetails = await createTutorDao(tutorData)
    if (tutorDetails) {
        let MondayData, TuesdayData, WednesdayData, ThursdayData, FridayData, SaturdayData, SundayData = []

        if (body.Slots.Monday.length > 0) {

            MondayData = body.Slots.Monday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Monday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Tuesday.length > 0) {

            TuesdayData = body.Slots.Tuesday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Tuesday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Wednesday.length > 0) {

            WednesdayData = body.Slots.Wednesday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Wednesday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Thursday.length > 0) {

            ThursdayData = body.Slots.Thursday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Thursday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Friday.length > 0) {

            FridayData = body.Slots.Friday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Friday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Saturday.length > 0) {

            SaturdayData = body.Slots.Saturday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Saturday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }
        if (body.Slots.Sunday.length > 0) {

            SundayData = body.Slots.Sunday.map((slot) => {
                return {
                    userCode: tutorDetails.userCode,
                    day: "Sunday",
                    from: slot.from,
                    to: slot.To,
                    isAvailable: true,
                    isBooked: false,
                    bookedData: [],
                    addSlots: [],
                    isTemp: false,
                    availableMonth: {
                        Jan: "0",
                        Feb: "0",
                        Mar: "0",
                        Apr: "0",
                        May: "0",
                        Jun: "0",
                        Jul: "0",
                        Aug: "0",
                        Sep: "0",
                        Oct: "0",
                        Nov: "0",
                        Dec: "0"
                    }
                }
            })

        }

        let combinedSlots = [...(MondayData || []),
        ...(TuesdayData || []),
        ...(WednesdayData || []),
        ...(ThursdayData || []),
        ...(FridayData || []),
        ...(SaturdayData || []),
        ...(SundayData || [])];


        const addSlots = await InserSlotsDao(combinedSlots)
        if (combinedSlots) {
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
                logInDetails: tutorDetails.logInDetails,
                Slots: combinedSlots
            }
            return responseData
        }

    }
}


export const AddtutorSlotByAdminService = async (body) => {

    const availableSlot = {
        userCode: body.userCode,
        subjects: body.subjects,
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
        let SlotList = {
            userCode: Slots.userCode,
            subjects: Slots.subjects,
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


export const GetAllTutorsList = async () => {
    let tutorsList = await getTutorsList()
    tutorsList = await Promise.all(tutorsList.map(async (tutorDetails) => {
        // Fetch tutorDetails for each student
        const coordinatorDetails = await fetchSingleuser(tutorDetails.Coordinator);
        // Return the student object with an additional `coordinator` property
        return {
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
            Coordinator: coordinatorDetails,
            logInDetails: tutorDetails.logInDetails

        };
    }));
    return tutorsList
}