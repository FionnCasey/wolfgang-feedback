import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }
  content: String,
  tags: [String],
  children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  meta: {
    upvotes: Number,
    downvotes: Number
  }
}, { timestamp: true });

export default mongoose.model('Post', PostSchema);
