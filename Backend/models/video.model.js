import mongoose from "mongoose";

const commentSchema= new mongoose.Schema(
    {
    commentId:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    text:String,
},
{timestamps:true}
);
const videoSchema=new mongoose.Schema({
    videoId:{
        type:String,
        unique:true,
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:"",
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnailUrl:{
        type:String,
    },
    channelId:{
        type:String,
        required:true,
    },
    uploader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
        default:"general"
    },
    tags:[
        {
            type:String,
        }
    ],
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0,
    },
    comments:[commentSchema],

},
{timestamps:true}

);

videoSchema.index({ title: "text" });
videoSchema.index({ category: 1 });
videoSchema.index({ views: -1 });

export default mongoose.model("Video",videoSchema);