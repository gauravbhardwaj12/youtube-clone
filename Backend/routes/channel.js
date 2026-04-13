import express from "express";
import { createChannel, getchannels, viewchannel } from "../controllers/channel.controller.js";
import auth from "../middlewares/auth.js";

const channelRouter=express.Router();

channelRouter.post("/create-channel",auth,createChannel);
channelRouter.get("/listchannels",auth,getchannels);
channelRouter.get("/viewchannel/:id",auth,viewchannel);

export default channelRouter;
