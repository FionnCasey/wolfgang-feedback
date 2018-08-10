import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: String,
  title: String,
  content: String,
  tags: [String],
  children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  meta: {
    upvotes: Number,
    downvotes: Number
  }
}, { timestamp: true });

export default mongoose.model('Post', PostSchema);
