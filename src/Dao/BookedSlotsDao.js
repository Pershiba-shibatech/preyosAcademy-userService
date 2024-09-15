import BookedSlots from '../models/BookedSlots.js'

export const GetBookedSlotsofStudentDao = async (Usercode) => {

    const StudentBookedSlots = await BookedSlots.find({ studenUsercode: Usercode })
    return StudentBookedSlots

}

export const BookaSlotByStudent = async (data) => {

    const bookSlot = await BookedSlots.create(data)
    if (bookSlot) {
        return bookSlot
    }
}

export const updateSlotDetails = async (Id, data) => {
    const updatedSlot = await BookedSlots.findOneAndUpdate({ sessionId: Id }, data, { upsert: true, new: true })
    if (updatedSlot) {
        return updatedSlot
    }
}

