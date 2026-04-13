import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Videocard from "../components/Videocard";
import '../css/viewchannel.css'

function Viewchannel(){
    const {id}=useParams();
    const token=localStorage.getItem("token");
    const [channeldata,setchanneldata]=useState({});
    const [videos, setVideos] = useState([]);

    useEffect(() => {
  //  Fetch channel details
  fetch(`http://localhost:3200/user/viewchannel/${id}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`
    }
  })
    .then((d) => d.json())
    .then((data) => setchanneldata(data.channel))
    .catch((e) => console.log(e));

  //  Fetch videos of this channel (NEW API)
  fetch(`http://localhost:3200/channel/${id}/videos`,{
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`
    }
  })
    .then((d) => d.json())
    .then((data) => {console.log(data);setVideos(data.videos)})
    .catch((e) => console.log(e));

}, [id]);

    
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
    {videos.length === 0 ? (
      <p>No videos uploaded yet</p>
    ) : (
      videos.map((video) => (
        <Videocard key={video.videoId} video={video} />
      ))
    )}
  </div>
</div>

  </div>
);
}

export default Viewchannel;