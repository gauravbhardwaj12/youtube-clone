import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Listchannels(){
    const token=localStorage.getItem("token");
    const [list,setlist]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:3200/user/listchannels",{
                    method:"GET",
                    headers:{
                        "content-type":"application/json",
                        Authorization:`JWT ${token}`
                    }
                })
                .then((d)=>d.json())
                .then((data)=>{setlist(data.channels);})
                .catch((e)=>console.log("error",e)); 

    },[])


    return (
  <div className="channels-container">
    
    <h2>Your Channels</h2>

    <div className="channels-grid">
      {list.map((channelid, index) => {
        return (
          <Link 
            key={index} 
            to={`/viewchannel/${channelid}`} 
            className="channel-card"
          >
            <div className="channel-avatar">
              <span>{index + 1}</span>
            </div>

            <div className="channel-info">
              <h4>Channel {index + 1}</h4>
              <p>ID: {channelid}</p>
            </div>
          </Link>
        );
      })}
    </div>

  </div>
);
}

export default Listchannels;