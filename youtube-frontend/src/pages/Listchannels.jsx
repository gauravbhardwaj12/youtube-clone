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


    return(<>
    List of your channels
    {list.map((channelid,index)=>{
        return(
        <Link key={index} to={`/viewchannel/${channelid}`}>channel1</Link>
        )
    })}


    </>);
}

export default Listchannels;