import mongoose from 'mongoose'


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

const StudentInfoSchema = new mongoose.Schema(
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
            type: String,
            default: () => new mongoose.Types.ObjectId().toString(),
        },
        studentName: {
            required: true,
            type: String,
            trim: true,
        },
        grade: {
            required: true,
            type: String,
            trim: true,
        },
        parentName: {
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
        Requirements: {
            required: true,
            type: [String],
        },
        AccountDetails: {

            AccountNumber: {
                type: String,
            },
            IFSC_Code: {
                type: String,
            },
            Branch: {
                type: String,
            }
        },
        userType: {
            required: true,
            type: String,

        },
        Coordinator: {
            required:true,
            type: String,
            trim: true,
        },
        logInDetails: LogInDetailsSchema,
    },
    {
        timestamps: true,
    }
);

const StudentInfo = mongoose.model("studentInfo", StudentInfoSchema);
export default StudentInfo;