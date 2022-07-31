import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('notes', NoteSchema);