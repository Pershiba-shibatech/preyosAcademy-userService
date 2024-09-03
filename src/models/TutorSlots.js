
import mongoose from 'mongoose'

const SlotData = {
    from: {
        type: String,
        required: true,
        trim: true,
    },
    to: {
        type: String,
        required: true,
        trim: true,
    },
    ampm: {
        type: String,
        required: true,
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false,
    }
}

const SlotSchema = new mongoose.Schema({
    userCode: {
        required: true,
        type: String,
    },
    subjects:{
        required: true,
        type: [String],
    },
    Monday: [SlotData],
    Tuesday: [SlotData],
    Wednesday: [SlotData],
    Thursday: [SlotData],
    Friday: [SlotData],
    Saturday: [SlotData],
    Sunday: [SlotData],
});
const TutorSlots = mongoose.model("tutorSlots", SlotSchema);
export default TutorSlots;