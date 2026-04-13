import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/viewchannel.css'

function Viewchannel(){
    const {id}=useParams();
    const token=localStorage.getItem("token");
    const [channeldata,setchanneldata]=useState({});

    useEffect(()=>{
        fetch(`http://localhost:3200/user/viewchannel/${id}`,{
            headers:{
                "content-type":"application/json",
                Authorization:`JWT ${token}`
            }
        })
        .then((d)=>d.json())
        .then((data)=>setchanneldata(data.channel))
        .catch()
    },[])
    return (
  <div className="channel-page">

    {/* TOP BANNER */}
    <div className="channel-banner"></div>

    {/* CHANNEL INFO */}
    <div className="channel-header">

      <div className="channel-left">
        <div className="channel-logo">
          <img src="" alt="Channel Logo" />
        </div>

        <div className="channel-text">
          <h2>{channeldata.channelName || "Channel Name"}</h2>
          <p>{channeldata.description || "No description available"}</p>
        </div>
      </div>

      <div className="channel-actions">
        <button className="secondary-btn">Customize</button>
        <button className="secondary-btn">Manage Videos</button>
        <Link to={`/uploadvideo/${id}`} className="primary-btn">
          Upload Video
        </Link>
      </div>

    </div>

    {/* VIDEOS SECTION */}
    <div className="videos-section">
      <h3>Videos</h3>

      <div className="videos-grid">
        <div className="video-card">No videos yet</div>
      </div>
    </div>

  </div>
);
}

export default Viewchannel;