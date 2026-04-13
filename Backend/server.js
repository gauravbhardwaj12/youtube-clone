import express from "express";
import usersRouter from "./routes/users.js";
import channelRouter from "./routes/channel.js";
import videoRouter from "./routes/video.js";
import auth from "./middlewares/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import { addComment, getComments, getRecommendedVideos, getvideobyId, getvideos, incrementDislikes, incrementLikes, incrementViews, searchVideos } from "./controllers/video.controller.js";
const app=express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173',credentials:true}));
app.use("/uploads", express.static("uploads"));
mongoose.connect("mongodb://localhost:27017/youtubedb");  // we can put our connection url here
const db=mongoose.connection;
db.on("open",()=>{
    console.log("database connnected");
});
db.on("error",()=>{
    console.log("error in connection");
})

app.listen(3200,()=>{
    console.log("server is running dont worry");
})
app.get("/",(req,res)=>{
    res.send("route is working ")
})
app.get("/videos",getvideos);
app.get("/video/:videoId",getvideobyId);
app.patch("/videos/:videoId/views",incrementViews);
app.patch("/videos/:videoId/likes",incrementLikes);
app.patch("/videos/:videoId/dislikes",incrementDislikes);
app.post("/videos/:videoId/comments", auth, addComment);
app.get("/videos/:videoId/comments", getComments);
app.get("/search",searchVideos);

app.get("/recommended/:videoId", getRecommendedVideos);
app.use("/users",usersRouter);
app.use("/user",channelRouter);
app.use("/user/channel",videoRouter);