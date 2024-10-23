import mongoose from 'mongoose'

const LibrarySchema = new mongoose.Schema({
    studenUsercode: {
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
    sessionSubject: {
        required: true,
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
})

const Library = mongoose.model("library", LibrarySchema);
export default Library;