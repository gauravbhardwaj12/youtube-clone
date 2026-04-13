import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Comment from "../components/comment";
import Videocard from "../components/Videocard";
import '../css/Viewvideo.css';

function Viewvideo(){
    const {id}=useParams();
    const [video,setVideo]=useState({});
    const [recommend,setRecommend]=useState([]);
    const [showFull, setShowFull] = useState(false);
    useEffect(()=>{
        fetch(`http://localhost:3200/video/${id}`)
    .then((d)=>d.json())
    .then((data)=>setVideo(data.video))
    .catch();

    fetch(`http://localhost:3200/recommended/${id}`)
    .then((d)=>d.json())
    .then((data)=>setRecommend(data.videos))
    .catch((e)=>console.log(e));

    },[id]);


function getYouTubeId(url) {
  if (!url) return null;

  const regex = /(?:v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}


const videoId = getYouTubeId(video.videoUrl);
const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};
if (!videoId) return <p>Invalid video</p>;

// CALL API WHEN VIDEO STARTS
  const handlePlay = async () => {
    try {
      await fetch(`http://localhost:3200/videos/${id}/views`, {
        method: "PATCH",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLikes = async () => {
    try {
      await fetch(`http://localhost:3200/videos/${id}/likes`, {
        method: "PATCH",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDislikes = async () => {
    try {
      await fetch(`http://localhost:3200/videos/${id}/dislikes`, {
        method: "PATCH",
      });
    } catch (err) {
      console.log(err);
    }
  };

    return (
  <div className="viewvideo-container">

    {/* LEFT SIDE */}
    <div className="mainvideo">

      <YouTube videoId={videoId} onPlay={handlePlay} opts={opts} />

      <h2 className="video-title">{video.title}</h2>

      {/* VIDEO ACTIONS */}
      <div className="video-actions">
        <span>{video.views} views</span>

        <div className="like-buttons">
          <button onClick={handleLikes}>👍 {video.likes}</button>
          <button onClick={handleDislikes}>👎 {video.dislikes}</button>
        </div>
      </div>

      {/* DESCRIPTION (NEW 🔥) */}
      <div className="video-description">
        <h4>Description</h4>
        <p className={showFull ? "expanded" : "collapsed"}>
          {video.description || "No description available"}
        </p>
        <button 
          className="toggle-btn" 
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Show less" : "Show more"}
        </button>
      </div>

      <Comment videoId={id} />

    </div>

    {/* RIGHT SIDE */}
    <div className="recommended">
      {recommend.map((video) => (
        <Videocard key={video.videoId} video={video} />
      ))}
    </div>

  </div>
);
}
export default Viewvideo;