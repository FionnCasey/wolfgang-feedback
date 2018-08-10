import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  meta: {
    upvotes: Number,
    downvotes: Number
  }
}, { timestamp: true });

export default mongoose.model('Comment', CommentSchema);
