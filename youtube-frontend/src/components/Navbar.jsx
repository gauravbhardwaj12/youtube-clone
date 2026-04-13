import "../css/Navbar.css";
import logo from "../assets/logo.png"
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "./Authuser";

function Navbar(){
    const [showSidebar,setShowsSidebar] = useState(false); // 🔥 fixed default
    const [islogin, setIslogin] = useState(false);

    const location=useLocation();
    
    const navigate = useNavigate();
    const [query,setQuery] = useState("");

    const handleSearch = () => {
        if (!query) return;
        navigate(`/search?query=${query}`);
    };

    // function to check login
    const checkLogin = async () => {
        try {
            const data = await verifyUser();
            setIslogin(data.success);
        } catch {
            setIslogin(false);
        }
    };

    //calling login 
    useEffect(()=>{
        checkLogin();
    },[location]);

    const handleLogout = () => {
        localStorage.removeItem("token"); // remove token
        setIslogin(false); // 🔥 IMPORTANT FIX
        navigate("/login"); // redirect
    };

    return(
    <>
    <nav>
        <div id="leftheader">
            <FontAwesomeIcon icon={faBars} className="burgericon" onClick={()=>setShowsSidebar(!showSidebar)} />
            <div id="logo item"><Link to='/'><img src={logo} height="100px" alt="" /></Link></div>
        </div>        

        <div id="searchbox">
            <input 
                type="text" 
                placeholder="Search" 
                onChange={(e)=>setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>

        <div id="rightheader">
            <ul>
                {islogin ? (
                <>
                    <li><Link to="/profile">Your account</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </>
                ) : (
                    <li><Link to="/login">Sign in </Link></li>
                )}
            </ul>
        </div>
    </nav>

    {showSidebar ? (
        <aside>
            <div className="sidebaruppernav">
                <FontAwesomeIcon icon={faBars} onClick={()=>setShowsSidebar(!showSidebar)}/>
                <img src={logo} height="100px" alt="" />
            </div>
            <div>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>Shorts</Link></li>
                    <li><Link to='/'>Subscriptions</Link></li>
                    <li><Link to='/'>You</Link></li>
                    <li><Link to='/'>History</Link></li>
                </ul>
            </div>
        </aside> 
    ) : null}

    </>
    )
}

export default Navbar;