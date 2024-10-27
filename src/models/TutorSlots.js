
import mongoose from 'mongoose'

const SlotSchema = new mongoose.Schema({
    userCode: {
        required: true,
        type: String,
    },
    day: {
        type: String,
        required: true,
    },
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
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: false,
    },
    bookedData: {
        type: [String],
        default: []
    },
    addSlots: {
        type: [String],
        default: []
    },
    isTemp: {
        type: Boolean,
        required: true,
        default: false,
    },
    availableMonth: {
        Jan: { type: String, required: false },
        Feb: { type: String, required: false },
        Mar: { type: String, required: false },
        Apr: { type: String, required: false },
        May: { type: String, required: false },
        Jun: { type: String, required: false },
        Jul: { type: String, required: false },
        Aug: { type: String, required: false },
        Sep: { type: String, required: false },
        Oct: { type: String, required: false },
        Nov: { type: String, required: false },
        Dec: { type: String, required: false }
    }

});
const TutorSlots = mongoose.model("tutorSlots", SlotSchema);
export default TutorSlots;