const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: String,
    content: String,
    postId:String
  });

const likedSchema = new mongoose.Schema({
    postId:String,
    authorId:String
})

const postSchema = new mongoose.Schema({
    username: String,
    images:String,
    title: String,
    content: String,
    category: String,
    date: String,
    publicurl:String,
    likedBy:[{type:mongoose.Schema.Types.ObjectId, ref: 'Likedby'}],
    author: {type:mongoose.Schema.Types.ObjectId},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const CommentModel = mongoose.model('Comment', commentSchema);
const LikedByModel = mongoose.model('Likedby',likedSchema);
const PostModel = mongoose.model('Post', postSchema);

module.exports={
    PostModel,CommentModel,LikedByModel
}