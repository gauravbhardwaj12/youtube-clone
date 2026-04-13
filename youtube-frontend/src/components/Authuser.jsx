import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const verifyUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const res = await fetch("http://localhost:3200/users/loggedin", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    return data;

  } catch (e) {
    return false;
  }
};

export function Authuser({children}){
    const navigate=useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        return;
      }
        fetch("http://localhost:3200/users/loggedin",{
            method:"GET",
            headers:{
                Authorization:`JWT ${token}`,
            },
        })
        .then((d)=>d.json())
        .then((data)=>{
            if(!data.success){
            navigate("/login");
            }
        })
        .catch()
    },[]);
    return children;
}
