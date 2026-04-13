import express from "express";
import { getvideos, uploadvideo } from "../controllers/video.controller.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
const videoRouter=express.Router();

videoRouter.post("/uploadvideo",auth,upload.single("thumbnail"),uploadvideo);
videoRouter.get("/videos",getvideos);

export default videoRouter;
