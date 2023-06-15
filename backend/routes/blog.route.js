const express = require("express");
const { PostModel, CommentModel, LikedByModel } = require("../model/blog.model");

const blogRouter = express.Router();


blogRouter.get("/posts",async(req,res)=>{
    const {page,title,category,author,limit,sort,order} = req.query;
    let query = {};
    if(title){
        query.title = title;
    }
    if(category){
        query.category = category
    }
    if(author){
        query.author = author
    }
    const pageNumber = parseInt(page,10) || 1;
    const limitNumber = parseInt(limit,10) || 5;
    try {
        if(sort){
            let response = await PostModel.find(query).skip((pageNumber - 1)*limitNumber).limit(limitNumber).populate([{path:"likedBy",model:"Likedby"},{path:"author",model:"user"},{path:"comments",model:"Comment"}]).sort({[sort]:order === "desc" ? -1 : 1});
            res.send(response);
        }else {
            let response = await PostModel.find(query).skip((pageNumber - 1)*limitNumber).limit(limitNumber).populate([{path:"likedBy",model:"Likedby"},{path:"author",model:"user"},{path:"comments",model:"Comment"}]);
        res.send(response);
        }
        
    } catch (error) {
        console.log(error);
    }
})

// add
blogRouter.post("/post",async(req,res)=>{
    let {username,images,title,content,category,date,publicurl,likes,author} = req.body;
    let response = new PostModel({username,images,title,content,category,date,publicurl,likes,author});
            await response.save();
            res.send("data added");
})

// update
blogRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const payload = req.body;
    console.log(payload);
    // let blog_id = bloger._id;
    try {
        const bloger = await PostModel.findOne({_id:id});
        // await PostModel.findByIdAndUpdate({_id:blog_id},{username:payload.username,images:payload.images,title:payload.title,content:payload.content,category:payload.category,date:payload.date,publicurl:publicurl,likedBy:payload.likedBy,author:payload.author,comments:payload.comments});
        Object.assign(bloger,payload);
        await bloger.save();
        res.send("data has been updated");
    } catch (error) {
        console.log("not updated");
        res.send(error);
    }
})

// get likes

blogRouter.post("/likes",async(req,res)=>{
    let {postIds,authorIds} = req.body;
    let liked_author = await LikedByModel.findOne({postId:postIds,authorId:authorIds});

    if(liked_author){
        res.send("like present in this post")
    }else {
        res.send("like not present");
    }
})

// update likes
blogRouter.post("/updatelike/:id",async(req,res)=>{
    const postId = req.params.id;
    const {authorId} = req.body;
    let liked = await LikedByModel.findOne({postId:postId,authorId:authorId});

    if(!liked){
        let likednew = new LikedByModel({postId:postId,authorId:authorId});
        await likednew.save();
        let post = await PostModel.findById(postId);
        const postliked = post.likedBy;
        postliked.push(likednew._id);
        post.save();
        res.send("liked");
    }else if(liked){
        await LikedByModel.findByIdAndDelete({_id:liked._id});
        res.send("not liked");
    }
})

// delete
blogRouter.delete("/delete",async(req,res)=>{
    const publicurls = req.query.publicurls;
    const id = req.query.id;
    const publicurls1 = publicurls.split("/");
    const realpublicurl = publicurls1[1];
    const bloger = await PostModel.findOne({_id:id});
    try {
        await PostModel.findByIdAndDelete({_id:id});
        await CommentModel.deleteMany({postId:id});
        await LikedByModel.deleteMany({postId:id});
        res.send("data has been deleted");
    } catch (error) {
        console.log("not deleted");
        res.send(error);
    }
})

// comments
blogRouter.post("/comment",async(req,res)=>{
    let {blog_id,username,content} = req.body;
    let comment = new CommentModel({username,content,postId:blog_id});
    await comment.save();
    let post =await PostModel.findById(blog_id);
    let postComment =post.comments;
    postComment.push(comment._id);
    post.save();
    res.send("comment added");
})


module.exports={
    blogRouter
}