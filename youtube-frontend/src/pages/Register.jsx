import { useState, } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate();

    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    function handleRegister(e){
        e.preventDefault();
        console.log(username,email,password)
        const newuser={
            username:username,
            email:email,
            password:password
        }
        fetch("http://localhost:3200/users/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newuser)
        })
        .then((d)=>d.json())
        .then((data)=>{navigate("/");console.log(data)})
        .catch((e)=>console.log("error",e))

    }

    return(<>
    <h4>Fill in the details to Register</h4>
    <form onSubmit={handleRegister} action="">
        <div><label htmlFor="">UserName</label><input type="text" placeholder="UserName" onChange={(e)=>setUsername(e.target.value)} /></div>
        <div><label htmlFor="">Email</label><input type="email" onChange={(e)=>setEmail(e.target.value)} /></div>
        <div><label htmlFor="">Password</label><input type="password" onChange={(e)=>setPassword(e.target.value)} /></div>
        <button type="submit">submit</button>
    </form>
    </>);
}
export default Register;