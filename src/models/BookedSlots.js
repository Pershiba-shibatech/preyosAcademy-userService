import mongoose from 'mongoose'

const BookedSlotsSchema = new mongoose.Schema({
    studenUsercode: {
        required: true,
        type: String,
        trim: true,
    },
    Bookedby: {
        required: true,
        type: String,
        trim: true,
    },
    tutorUsercode: {
        required: true,
        type: String,
        trim: true,
    },
    sessionMaterial: {
        required: true,
        type: String,
        trim: true,
    },
    sessionId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    sessionDetails: {
        required: true,
        type: String,
        trim: true,
    },
    sessionSubject: {
        required: true,
        type: String,
        trim: true,
    },
    paymentStatus: {
        required: true,
        type: String,
        trim: true,
    },
    sessionLink: {
        required: true,
        type: String,
        trim: true,
    },
    sessionStatus: {
        required: true,
        type: String,
        trim: true,
    }, topic: {
        required: true,
        type: String,
        trim: true,
    }, homeworkStatus: {
        required: true,
        type: String,
        trim: true,
    }, sessionSummary: {
        required: true,
        type: String,
        trim: true,
    }, studentFeedbackByTutor: {
        required: true,
        type: String,
        trim: true,
    }

})

const BookedSlots = mongoose.model("bookedSlots", BookedSlotsSchema);
export default BookedSlots;