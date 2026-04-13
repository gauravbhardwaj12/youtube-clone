import { Link } from "react-router-dom";
function Profile(){
    return(<>
    <div>
        <img src="" alt="Your profile pitcure" />
        <button>select picture</button>

        <form action="">
        <div>

            <label htmlFor="">Name</label>
            <label htmlFor="">Email</label>

        </div>
    </form>
    </div>
    
    <p>List of channels</p>
    <Link to="/listchannels">Add or manage your channel(s)</Link>
    <Link to="/newchannel"> create new channel</Link>
    </>);
}
export default Profile;