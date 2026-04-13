# 🎬 YouTube Clone (MERN Stack)

This is a full-stack YouTube-inspired web application where users can create channels, upload videos, and watch content.

---

## 🚀 Features

* User Registration & Login
* Create and Manage Channels
* Upload Videos with Thumbnail
* Watch Videos (YouTube Embed)
* Like / Dislike functionality
* View count tracking
* Category-based filtering
* Recommended videos

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* React Router
* CSS

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/gauravbhardwaj12/youtube-clone.git
cd youtube-clone
```

---

### 2. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

---

### 3. Start the project

Start backend:

```bash
cd server
npm start
```

Start frontend:

```bash
npm run dev
```

---

## 🌱 Seed Data (Optional)

To add sample data:

```bash
node seed.js
```

---

## 🔗 API Endpoints

* `POST /users/register` → Register user
* `POST /users/login` → Login user
* `GET /videos` → Get all videos
* `GET /video/:id` → Get single video
* `GET /channel/:id/videos` → Get videos of a channel
* `POST /user/channel/uploadvideo` → Upload video

---

## 📸 Pages Included

* Home Page (Video Feed)
* Channel Page
* Video Watch Page
* Login / Register

---

## 📌 Note

All configuration values (MongoDB URL, JWT secret, etc.) are currently hardcoded in the backend for simplicity.

---

## 👨‍💻 Author

Gaurav Bhardwaj
