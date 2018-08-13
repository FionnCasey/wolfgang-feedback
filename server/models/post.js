import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    _author: { type: Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    text: String,
    isDeleted: { type: Boolean, default: false },
    _children: [{ type: Schema.ObjectId, ref: 'Comment' }],
    _votes: [{ type: Schema.ObjectId, ref: 'Vote' }]
}, { timestamps: true });

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
  this.populate({
    path: '_votes',
    select: 'value -_id'
  });
  next();
}

postSchema.pre('find', populatePost)
          .pre('findOne', populatePost)
          .pre('findOneAndUpdate', populatePost);

export default mongoose.model('Post', postSchema);
