
import mongoose from 'mongoose'


const paymentSchema = new mongoose.Schema({
    userCode: {
        required: true,
        type: String,
    },
    paymentId: {
        required: true,
        type: String,
    },
    paymentReferenceId: {
        required: true,
        type: String,
    },
    paymentStatus:{
        required: true,
        type: String,
    },
    PaymentDate:{
        required: true,
        type: String,
    },
    modeOfPayment:{
        required: true,
        type: String,   
    }

});
const TutorPaymentList = mongoose.model("tutorPaymentList", paymentSchema);
export default TutorPaymentList;