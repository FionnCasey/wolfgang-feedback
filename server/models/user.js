import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import fs from 'fs';

const Schema = mongoose.Schema;

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Username must be at least 1 character long.']
    },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.']
    },
    image: { type: String, trim: true },
    isAdmin: { type: Boolean, default: false }
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
  next();
});

export default mongoose.model('User', userSchema);
