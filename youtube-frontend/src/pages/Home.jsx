import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Videocard from "../components/Videocard";
import '../css/Home.css'

function Home(){
    const [videos,setVidoes]=useState([]);
    const [category,setCategory]=useState("");
    useEffect(()=>{
        let url = "http://localhost:3200/videos";

            if (category) {
            url += `?category=${category}`;
            }
        fetch(url)
        .then((d)=>d.json())
        .then((data)=>{setVidoes(data.videos)})
        .catch((e)=>{
            console.log("error",e)
        })
    },[category]);
    return (
  <div className="home-container">

    {/* CATEGORY FILTER */}
    <div className="category-bar">
      <button 
        className={!category ? "active" : ""} 
        onClick={() => setCategory("")}
      >
        All
      </button>

      <button 
        className={category === "Education" ? "active" : ""} 
        onClick={() => setCategory("Education")}
      >
        Education
      </button>

      <button 
        className={category === "Tech" ? "active" : ""} 
        onClick={() => setCategory("Tech")}
      >
        Tech
      </button>

      <button 
        className={category === "Music" ? "active" : ""} 
        onClick={() => setCategory("Music")}
      >
        Music
      </button>
    </div>

    {/* VIDEOS GRID */}
    <div className="home-grid">
      {videos.map((v) => (
        <Videocard key={v.videoId} video={v} />
      ))}
    </div>

  </div>
);
}
export default Home;