import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Videocard from "../components/Videocard";

function Searchpage(){
    const [videos,setVideos]=useState([]);
    const [category,setCategory]=useState("");
    const location=useLocation();
    const queryparams= new URLSearchParams(location.search);
    const query=queryparams.get("query");
    useEffect(()=>{
        let url = `http://localhost:3200/search?query=${query}`;
        if(category){
            url+=`&category=${category}`;
        }
        fetch(url)
      .then(res => res.json())
      .then(data => setVideos(data.videos));
    },[query,category]);
    console.log(videos);
    return(<>
   
    <h2>Results for "{query}"</h2>
    <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("Education")}>Education</button>
        <button onClick={() => setCategory("Tech")}>Tech</button>
        <button onClick={() => setCategory("Music")}>Music</button>
      </div>
    {videos.map((video) => (
        <Videocard key={video.videoId} video={video} />
      ))}
    
    </>);
}
export default Searchpage;


