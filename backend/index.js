//console.log((new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()));
const express = require("express");

const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/auth.route");
const { blogRouter } = require("./routes/blog.route");
const fileUpload = require("express-fileupload")
const app = express();
app.use(cors({
    origin:"*"
}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page");
})
app.use(fileUpload({
    useTempFiles:true
}))
app.use("/user",userRouter);
app.use("/blogs",blogRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`server is running at port${process.env.port}`);
})