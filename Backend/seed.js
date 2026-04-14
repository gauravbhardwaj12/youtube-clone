import mongoose from "mongoose";
import usermodel from "./models/usermodel.js";
import channelModel from "./models/channel.model.js";
import videoModel from "./models/video.model.js";

mongoose.connect("mongodb://127.0.0.1:27017/youtubedb")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    await usermodel.deleteMany();
    await channelModel.deleteMany();
    await videoModel.deleteMany();

    console.log("Old data removed");

    // 👤 USER
    const user = await usermodel.create({
      username: "gaurav",
      email: "gaurav@test.com",
      password: "123456"
    });

    // 📺 CHANNEL
    const channel1 = await channelModel.create({
      channelName: "Tech With Gaurav",
      description: "Coding and tech videos",
      userId: user._id
    });

    // 🎥 VIDEOS (5 UNIQUE videoId)
    await videoModel.insertMany([
      {
        videoId: "vid101",
        title: "React Full Course",
        description: "Learn React step by step",
        videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        category: "Education",
        channelId: channel1._id,
        views: 120,
        likes: 10,
        dislikes: 1
      },
      {
        videoId: "vid102",
        title: "Node.js Crash Course",
        description: "Backend in one video",
        videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        category: "Tech",
        channelId: channel1._id,
        views: 90,
        likes: 8,
        dislikes: 0
      },
      {
        videoId: "vid103",
        title: "JavaScript Basics",
        description: "Start JS from zero",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        category: "Education",
        channelId: channel1._id,
        views: 200,
        likes: 15,
        dislikes: 2
      },
      {
        videoId: "vid104",
        title: "CSS Flexbox Guide",
        description: "Master flexbox layout",
        videoUrl: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
        category: "Tech",
        channelId: channel1._id,
        views: 75,
        likes: 6,
        dislikes: 1
      },
      {
        videoId: "vid105",
        title: "Lo-fi Music Mix",
        description: "Relax and focus music",
        videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        category: "Music",
        channelId: channel1._id,
        views: 500,
        likes: 50,
        dislikes: 3
      }
    ]);

    console.log("✅ Seeding completed successfully");
    process.exit();

  } catch (err) {
    console.log("❌ Error:", err);
    process.exit();
  }
};

seedData();