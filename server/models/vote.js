import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    _user: { type: Schema.ObjectId, ref: 'User' },
		_parent: Schema.ObjectId,
		value: { type: Number, required: true }
});

export default mongoose.model('Vote', voteSchema);
