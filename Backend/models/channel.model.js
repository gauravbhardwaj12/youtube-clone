import mongoose from "mongoose";
const channelSchema=new mongoose.Schema(
    {
        channelId:{
            type:String,
            unique:true,
        },
        channelName:{
            type:String,
            required:true
        },
        description:{
            type:String,
            default:""
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        channelBanner: {
                    type: String,
                    default: "",
         },

        subscribers: {
                    type: Number,
                    default: 0,
        },

  videos: [
    {
      type: String, // videoId
    }
  ]
    },
    {
        timestamps:true
    }
);

export default mongoose.model("Channel",channelSchema);