import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _post: { type: Schema.ObjectId, ref: 'Post' },
    _author: { type: Schema.ObjectId, ref: 'User' },
    text: String,
    isDeleted: { type: Boolean, default: false },
    _children: [{ type: Schema.ObjectId, ref: 'Comment' }]
}, { timestamp: true });

function populateComment(next){
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
};

commentSchema.pre('find', populateComment)
             .pre('findOne', populateComment);

export default mongoose.model('Comment', commentSchema);
