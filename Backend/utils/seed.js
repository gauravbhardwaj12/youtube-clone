// seed.js

const mongoose = require("mongoose");


const User = require("./models/User");
const Channel = require("./models/Channel");
const Video = require("./models/Video");


mongoose.connect("mongodb://127.0.0.1:27017/youtube-clone")
.then(() => console.log("DB Connected"))
.catch((err) => console.log(err));

async function seedData() {
  try {
   
    await User.deleteMany();
    await Channel.deleteMany();
    await Video.deleteMany();

    console.log("Old data deleted");

    // 👤 USERS
    const user = await User.create({
      username: "gaurav",
      email: "gaurav@test.com",
      password: "123456"
    });

    // 📺 CHANNELS
    const channel1 = await Channel.create({
      channelName: "Tech With Gaurav",
      description: "Coding and tech videos",
      userId: user._id
    });

    const channel2 = await Channel.create({
      channelName: "Daily Learning",
      description: "Education and tutorials",
      userId: user._id
    });

    // 🎥 VIDEOS
    await Video.insertMany([
      {
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
        title: "JavaScript Basics",
        description: "Start JS from zero",
        videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        category: "Education",
        channelId: channel2._id,
        views: 200,
        likes: 15,
        dislikes: 2
      },
      {
        title: "Music Chill Mix",
        description: "Relaxing music",
        videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        category: "Music",
        channelId: channel2._id,
        views: 500,
        likes: 50,
        dislikes: 3
      }
    ]);

    console.log("Seeding completed!");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

seedData();