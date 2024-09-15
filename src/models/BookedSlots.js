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
    sessionMaterial: {
        url: {

            type: String,
            trim: true,
        },
        display_name: {

            type: String,
            trim: true,
        },
        format: {

            type: String,
            trim: true,
        }
    },
   tutorUsercode: {
        required: true,
        type: String,
        trim: true,
    },
    sessionId: {
        required: true,
        type: String,
        // default: () => new mongoose.Types.ObjectId().toString(),
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

        type: String,
        trim: true,
    }, homeworkStatus: {

        type: String,
        trim: true,
    }, sessionSummary: {

        type: String,
        trim: true,
    }, studentFeedbackByTutor: {

        type: String,
        trim: true,
    },
    sessionBookingDetails: {
        from: {
            required: true,
            type: String,
        },
        to: {
            required: true,
            type: String,
        },
        id: {
            required: true,
            type: String,
        }

    }


}, {
    timestamps: true,
})

const BookedSlots = mongoose.model("bookedSlots", BookedSlotsSchema);
export default BookedSlots;