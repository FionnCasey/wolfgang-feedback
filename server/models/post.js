import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    _author: { type: Schema.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    text: String,
    isDeleted: { type: Boolean, default: false },
    _children: [{ type: Schema.ObjectId, ref: 'Comment' }]
}, { timestamp: true });

function populatePost(next) {
  this.populate({
      path: '_author',
      select: 'username -_id'
  });
  this.populate({
    path: '_children',
    select: 'text _author',
    match: { 'isDeleted': false }
  });
  next();
}

postSchema.pre('find', populatePost)
          .pre('findOne', populatePost);

export default mongoose.model('Post', postSchema);
