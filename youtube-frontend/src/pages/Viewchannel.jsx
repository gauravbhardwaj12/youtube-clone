import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    return(<>
    <div className="channeldetail">
        <div className="channellogo"><img src="" alt="provide channel logo" /></div>
        <div className="channelinfo">
            <h1>channel name:{channeldata.channelName}</h1>
            <p>channel description: {channeldata.description}</p>
             
            <button>customose channel</button>
            <button>manage videos</button>
            <Link to={`/uploadvideo/${id}`}>Upload Video</Link>
        </div>
        <div>
            List of the channel videos 
        </div>

    </div>
    </>)
}

export default Viewchannel;