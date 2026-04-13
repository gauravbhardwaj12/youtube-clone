import videoModel from "../models/video.model.js";
import channelModel from "../models/channel.model.js";
import { extractVideoId } from "../utils/videoid.js";
import { nanoid } from "nanoid";


export const uploadvideo= async (req,res)=>{
    

    try{
        const userId=req.user.userId;
    const {channelId,title,description,videoUrl,category,tags}=req.body;
    const ytid=extractVideoId(videoUrl);
    let thumbnailUrl="";
    if(!ytid){
        return res.status(400).json({success:false,message:"Invalid Youtube URL"});
    }
    if (req.file) {
      thumbnailUrl = `http://localhost:3200/uploads/${req.file.filename}`;
    }

    // ❗ fallback to YouTube thumbnail
    else {
      thumbnailUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
console.log(thumbnailUrl);
    // check channel 

    //const channel= await channelModel.findOne({channelId:channelId});
    const channel=await channelModel.findOne({channelId:channelId});
    console.log(channel);

    if(!channel || channel.owner.toString()!==userId ){
        return res.status(403).json({
        success: false,
        message: "Not your channel",
      });
    }

    // converting tags to array
    let tagsArray = [];

if (tags) {
  tagsArray = tags
    .split(",")          // convert string → array
    .map(tag => tag.trim()) // remove spaces
    .filter(tag => tag !== ""); // remove empty values
}
    const newVideo= new videoModel({
        videoId:nanoid(),
        title,
        description,
        videoUrl,
        thumbnailUrl,
        channelId,
        uploader:userId,
        category,
        tags: tagsArray,
    });

    await newVideo.save();
    
    // add video to channel

    await channelModel.findOneAndUpdate(
        {channelId},
        {$push:{videos:newVideo.videoId}}
    );

        res.json({success:true,
            video:newVideo
        });

    }
    catch(err){
        console.log(err);
    res.status(500).json({ success: false });
    }
    
};

// get all videos

export const getvideos= async (req,res)=>{
    
    try{
       const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }
       const videos=await videoModel.find(filter);
         res.json({ success: true,
            videos:videos
                   });
    }
    catch (err){
      res.status(500).json({ success: false });
    }
}
 
export const getvideobyId = async (req,res)=>{
try{
   const videoId=req.params.videoId;
   const video= await videoModel.findOne({videoId});
    if(!video){
        res.status(404)
        .json({
            success:false,
            message:"Video not found",
        })
    }
    console.log(video);

    res.json({
        success:true,
        video:video
        });
}
catch(err){
console.log("error",err)
}

};


export const getRecommendedVideos = async (req, res) => {
  try {
    const { videoId } = req.params;

    const currentVideo = await videoModel.findOne({ videoId });

    if (!currentVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Same category + exclude current video
    const videos = await videoModel.find({
      category: currentVideo.category,
      videoId: { $ne: videoId },
    })
      .sort({ views: -1 })
      .limit(10);

    res.json({
      success: true,
      videos,
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const incrementViews=async (req,res)=>{
    try{
        const {videoId}=req.params;

       await videoModel.findOneAndUpdate(
                    { videoId: videoId }, 
                    { $inc: { views: 1 } }
);
        res.json({success:true});


    }
    catch(err){
        res.status(500).json({success:false})
    }
};
export const incrementLikes=async (req,res)=>{
    try{
        const {videoId}=req.params;

       await videoModel.findOneAndUpdate(
                    { videoId: videoId }, 
                    { $inc: { likes: 1 } }
);
        res.json({success:true});


    }
    catch(err){
        res.status(500).json({success:false})
    }
};

export const incrementDislikes=async (req,res)=>{
    console.log("pressed dislike")
    try{
        const {videoId}=req.params;

       await videoModel.findOneAndUpdate(
                    { videoId: videoId }, 
                    { $inc: { dislikes: 1 } }
);
        res.json({success:true});


    }
    catch(err){
        res.status(500).json({success:false})
    }
};

export const addComment=async (req,res)=>{
try{
    const{videoId}=req.params;
    const userId=req.user.id;
    const {text}=req.body;

    if(!text){
        return res
        .status(400)
        .json({
            success:false,
            message:"comment text required"
        })
    }
    const newComment={
        commentId:nanoid(),
        userId,
        text,
    };

    const video=await videoModel.findOneAndUpdate(
        {videoId},
        { $push: { comments: newComment } },
      { new: true }
    );
    res.json({
        success:true,
        comments:video.comments,
    })
}
catch(err){
    console.log(err);
    res.status(500).json({success:false})
}
};

export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await videoModel.findOne({ videoId })
      .populate("comments.userId", "username");

    res.json({
      success: true,
      comments: video.comments,
    });

  } catch {
    res.status(500).json({ success: false });
  }
};


//search functionality

export const searchVideos=async(req,res)=>{
    try{
        const { query, category } = req.query;
        let filter = {};
        if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } }, // title search
        { tags: { $regex: query, $options: "i" } }   // tags search
      ];
    }

     if (category) {
      filter.category = category;
    }

    const videos = await videoModel
      .find(filter)
      .sort({ views: -1 });

    res.json({
      success: true,
      videos,
    });


    }
    catch (err){
        console.log(err);
    res.status(500).json({ success: false });
    }
}

