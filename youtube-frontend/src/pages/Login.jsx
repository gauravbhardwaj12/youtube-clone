import {useState } from "react";
import { Link,useNavigate } from "react-router-dom";
function Login(){
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate();
    
   async function handleLogin(e){
        e.preventDefault();
        console.log(email,password);
        const credentials={
               email:email,
               password:password
            };
       await fetch("http://localhost:3200/users/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(credentials),
        })
        .then((d)=>d.json())
        .then((data)=>{
            if(!data.success){
                return ;
            }
            localStorage.setItem("token", data.token);
            navigate("/profile");
            console.log(data)})
        .catch((e)=>{console.log("error",e)});
       
    }
    
    
    return(<>
    <form onSubmit={handleLogin} action="">
<div><label htmlFor="">Email</label><input type="text" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)}/></div>
<div><label htmlFor="">Password</label><input type="password" placeholder="Your password" onChange={(e)=>setPassword(e.target.value)} /></div>
<button>Login</button>
    </form>
    <button><Link to="/register">Create account</Link></button>
    
    </>);
}

export default Login;