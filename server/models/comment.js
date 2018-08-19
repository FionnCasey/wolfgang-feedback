import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _author: { type: Schema.ObjectId, ref: 'User', required: true },
    _parent: { type: Schema.ObjectId, required: true },
    parentIsPost: { type: Boolean, required: true },
    text: String,
    isDeleted: { type: Boolean, default: false },
    _children: [{ type: Schema.ObjectId, ref: 'Comment' }],
    _votes: [{ type: Schema.ObjectId, ref: 'Vote' }]
}, { timestamps: true });

function populateComment(next){
  this.populate({
    path: '_author',
    select: 'username -_id'
  });
  this.populate({
    path: '_children',
    select: 'text _author createdAt updatedAt'
  });
  this.populate({
    path: '_votes',
    select: 'value _id _user'
  });
  next();
};

commentSchema.pre('find', populateComment)
             .pre('findOne', populateComment)
             .pre('findOneAndUpdate', populateComment);;

export default mongoose.model('Comment', commentSchema);
