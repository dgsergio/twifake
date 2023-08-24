const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema(
  {
    post: {
      type: String,
      required: [true, 'Please provide a 145 characters post'],
      minlength: 3,
      maxlength: 145,
    },
    imgUrl: {
      type: String,
      match: /^(ftp|http|https):\/\/[^ "]+$/,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'No user found to assign this post'],
    },
  },
  { timestamps: true }
);

module.exports = model('Post', postSchema);
