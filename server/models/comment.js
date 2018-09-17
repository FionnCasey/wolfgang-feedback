import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _author: { type: Schema.ObjectId, ref: 'User', required: true },
    _parent: { type: Schema.ObjectId, required: true },
    text: { 
      type: String,
      required: true,
      trim: true,
      minlength: [1, 'Comments must be at least 1 character long.']
    },
    _votes: [{ type: Schema.ObjectId, ref: 'Vote' }],
    _comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

function populateAuthor(next) {
  this.populate({
      path: '_author',
      select: 'username _id'
  });
  this.populate({
    path: '_votes',
    select: '_user value'
  });
  next();
}

commentSchema.pre('find', populateAuthor)
             .pre('findOne', populateAuthor)
             .pre('findOneAndUpdate', populateAuthor);

export default mongoose.model('Comment', commentSchema);