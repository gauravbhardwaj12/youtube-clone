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

    return (
  <div className="register-container">

    <form className="register-box" onSubmit={handleRegister}>
      
      <h2>Create Account</h2>

      <div className="input-group">
        <label>Username</label>
        <input 
          type="text" 
          placeholder="Enter username"
          onChange={(e)=>setUsername(e.target.value)} 
          required
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Enter email"
          onChange={(e)=>setEmail(e.target.value)} 
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input 
          type="password" 
          placeholder="Enter password"
          onChange={(e)=>setPassword(e.target.value)} 
          required
        />
      </div>

      <button className="register-btn">Register</button>

      <p className="login-text">
        Already have an account? <a href="/login">Login</a>
      </p>

    </form>

  </div>
);
}
export default Register;