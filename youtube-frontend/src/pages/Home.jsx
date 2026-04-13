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
    return(<>
    <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("Education")}>Education</button>
        <button onClick={() => setCategory("Tech")}>Tech</button>
        <button onClick={() => setCategory("Music")}>Music</button>
      </div>
    <div className="homelist">

        {videos.map((v) => (
            <Videocard key={v.videoId} video={v}/>
      ))}

    </div>
     
    
    </>);
}
export default Home;