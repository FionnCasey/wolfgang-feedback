import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [1, 'Username must be at least 1 character long.']
    },
    email: { type: String, required: true },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long.']
    }
});

export default mongoose.model('User', userSchema);
