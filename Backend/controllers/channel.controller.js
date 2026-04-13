import usermodel from "../models/usermodel.js";
import channelModel from "../models/channel.model.js";
import { nanoid } from "nanoid";
export const createChannel = async (req,res)=>{
try{
const userid=req.user.userId;
const {channelName,description} =req.body;
// create channel

const newChannel=new channelModel({
    channelId:nanoid(),
    channelName,
    description,
    owner:userid,
});

await newChannel.save();

// add chanel id to user document

await usermodel.findByIdAndUpdate(userid,{
    $push: {channels: newChannel.channelId},
});
res.json({
    success:true,
    channel:newChannel,
});


}
catch (err){
    console.log(err);
    res.status(500).json({success:false});

}

}
export const getchannels=async(req,res)=>{
    try{
        const userid=req.user.userId;
      const user=await usermodel.findById({_id:userid});
      res.json(user);

    }
    catch (err){
        res.status(400).json({error:err});

    }
}

export const viewchannel=async (req,res)=>{
    const channelId=req.params.id;
    const channel=await channelModel.findOne({channelId
});
    await res.json({
        success:true,
        channel:channel
    })
}