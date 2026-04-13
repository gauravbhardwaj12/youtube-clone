import { useState,useEffect } from "react";
import { verifyUser } from "../components/Authuser";
import { useNavigate } from "react-router-dom";

function Newchannel(){
    const [channelname,setchannelname]= useState();
    const [description,setDescription]=useState();
    const [islogin, setIslogin] = useState(false);
    const navigate=useNavigate();

       useEffect(()=>{
                   verifyUser().then((data)=>{setIslogin(data.success)}).catch((e)=>{console.log("error",e)});
          },[]);

          // check if user is logged in or not
          if(!islogin){
            navigate("/login")

          }
          const token = localStorage.getItem("token");
    function handlecreatechannel(e){
        e.preventDefault();
        if(!channelname || !description){
            alert("please provide channelname and description");
            return
        }
        const channel=
            {
                channelName:channelname,
                description:description
            }
            try{
                fetch("http://localhost:3200/user/create-channel",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                        Authorization:`JWT ${token}`
                    },
                    body:JSON.stringify(channel)
                })
                .then((d)=>d.json())
                .then((data)=>{console.log(data);alert("channel created successfully")})
                .catch((e)=>console.log("error",e));

            }
            catch (err){
                console.log(err);

            }

        
    }
    return(<>
    create new channel
    
    <div>
        <form action="" onSubmit={handlecreatechannel}>
            <div>
                 <label htmlFor="">Channel Name</label><input type="text" onChange={(e)=>setchannelname(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Channel Description</label><input type="text" onChange={(e)=>setDescription(e.target.value)}  />
            </div>
           
            <button type="submit">Submit</button>
        </form>
    </div>
    </>)
}
export default Newchannel;