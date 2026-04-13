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

    return(<>
    <div className="viewvideodiv">
         <div className="mainvideodiv">
            <YouTube videoId={videoId} onPlay={handlePlay} opts={opts}></YouTube>
            <h3>{video.title}</h3>
            <h3>Views: {video.views}</h3>
            <button onClick={handleLikes}>like</button><p>{video.likes}</p>
            <button onClick={handleDislikes}>dislike</button>{video.dislikes}

            <Comment videoId={id}/>
            
          </div>
        <div className="similarvideosdiv">
            {recommend.map((video) => (
        <Videocard key={video.videoId} video={video} />
      ))}
        </div>

    </div>
   
    
   
    </>);
}
export default Viewvideo;