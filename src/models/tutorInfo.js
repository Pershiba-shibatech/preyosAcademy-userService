import mongoose from 'mongoose'


const SlotSchema = new mongoose.Schema({
  from: {
    type: String,
    // required: true,
    trim: true,
  },
  to: {
    type: String,
    // required: true,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});



const CoordinatorSchema = {
  coordinatorId: {
    type: String,
    trim: true,
  },
  coordinatorName: {
    type: String,
    trim: true,
  },
}


const LogInDetailsSchema = {
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  lastLogged: {
    type: String,

  },
}
const AddressSchema = {
  AddressLine1: {
    type: String,

    trim: true,
  },
  AddressLine2: {
    type: String,
    trim: true,
  },
  State: {
    type: String,
    trim: true,
  },
  Country: {
    type: String,
    trim: true,
  },
  postalCode: {
    type: String,
    trim: true,

  }
};



const tutorInfoSchema = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      trim: true,
    },
    userCode: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    tutorName: {
      required: true,
      type: String,
      trim: true,
    },
    experince: {
      required: true,
      type: String,
      trim: true,
    },
    Address: AddressSchema,
    timeZone: {
      required: true,
      type: String,
      trim: true,
    },
    subjects: {
      required: true,
      type: [String],
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },
    phoneNumber: {
      required: true,
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      trim: true,
    },
    phoneWithoutCountryCode: {
      type: String,
      trim: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      default: "Bank Transfer",
    },
    AccountDetails: {
      type: String,
    },
    PaymentList: {
      type: [String],
    },
    userType: {
      required: true,
      type: String,

    },
    slotsAvailable: {
      Monday: [SlotSchema],
      Tuesday: [SlotSchema],
      Wednesday: [SlotSchema],
      Thursday: [SlotSchema],
      Friday: [SlotSchema],
      Saturday: [SlotSchema],
      Sunday: [SlotSchema],
    },
    coordinator: CoordinatorSchema,
    logInDetails: LogInDetailsSchema,
  },
  {
    timestamps: true,
  }
);

const tutorInfo = mongoose.model("tutorInfo", tutorInfoSchema);
export default tutorInfo;