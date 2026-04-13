import {useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../css/Login.css'
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
    
    
    return (
  <div className="login-container">
    <form className="login-box" onSubmit={handleLogin}>
      
      <h2>Sign in</h2>

      <div className="input-group">
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter your password" 
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>

      <button className="login-btn">Login</button>

      <p className="register-text">
        Don't have an account? 
        <Link to="/register"> Create account</Link>
      </p>

    </form>
  </div>
);
}

export default Login;