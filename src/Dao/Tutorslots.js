import TutorSlots from "../models/TutorSlots.js"


export const getSessionDetails = async (data) => {

    const sessionDetail = await TutorSlots.findOne({ _id: data }, { __v: 0 }).lean()
    return sessionDetail
    // const result = await getDayWithId(sessionDetail, sessionBookingDetails.id);

    // const sessionFormData = {
    //     slotId: sessionDetail._id,
    //     tutorUserCode: sessionDetail.userCode,
    //     subjects: sessionDetail.subjects,
    //     slot: {
    //         from: sessionBookingDetails.from,
    //         to: sessionBookingDetails.to,
    //         sessionDetails: result.slotData

    //     }

    // }
    // return sessionFormData



}


export const getDayWithId = async (data, id) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    // Loop through each day
    for await (let day of days) {
        // Find the object with the matching _id in the day's array
        const slot = data[day].find(slot => slot._id.toString() === id);

        // If found, return the entire day's array
        if (slot) {

            return { fullArray: data[day], slotData: slot };
        }
    }
    return null; // Return null if no matching _id is found
}


export const updateSlotBooked = async (userCode, sessionId, date, month) => {
    let updateSlot = await TutorSlots.findOneAndUpdate({ userCode, _id: sessionId }, {
        $set: { isBooked: true, isAvailable: false, bookedData: date, [`availableMonth.${month}`]: '1' },
        $addToSet: { addSlots: month }
    })
    return updateSlot;
}
export const updateSlotBookedForSingle = async (userCode, sessionId, date, month) => {
    let updateSlot = await TutorSlots.findOneAndUpdate({ userCode, _id: sessionId }, {
        $set: { isBooked: true, isAvailable: false, bookedData: date, [`availableMonth.${month}`]: '0' },
        $addToSet: { addSlots: month }
    })
    return updateSlot;
}
export const updateSlotForStatusBooked = async (sessionId, date, month) => {
   
    let setData =
        { isBooked: true, isAvailable: false, bookedData: date }

    if (date.length === 0) {
        setData = { isBooked: true, isAvailable: false, bookedData: date, [`availableMonth.${month}`]: '0' }
    }
    //getbookedSession.sessionBookingDetails.id
    let updateSlot
    if (date.length !== 0) {
        updateSlot = await TutorSlots.findOneAndUpdate({ _id: sessionId }, {
            $set:
                setData
        })
    } else {
        updateSlot = await TutorSlots.findOneAndUpdate({ _id: sessionId }, {
            $set: setData, $pull: { addSlots: month }
        })
    }

    return updateSlot;
}


export const updateBookedStatus = async (userCode, from, slotId) => {
    let tutorSlot = await TutorSlots.findOne({ userCode });

    if (!tutorSlot) {
        return { message: 'Tutor not found' };
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let dayFound = null;


    for await (let day of days) {
        const dayArray = tutorSlot[day];
        if (dayArray && dayArray.length > 0) {

            const slotIndex = dayArray.findIndex(slot => slot._id.toString() === slotId);

            if (slotIndex !== -1) {

                tutorSlot[day][slotIndex].isBooked = true;
                tutorSlot[day][slotIndex].bookedData ? tutorSlot[day][slotIndex].bookedData.push(from) : [from]
                dayFound = day;

                break;
            }
        }
    }

    if (dayFound) {

        const tutorSlotData = await TutorSlots.findOneAndUpdate({ userCode }, tutorSlot, { new: true });
        return tutorSlotData
    }
}

