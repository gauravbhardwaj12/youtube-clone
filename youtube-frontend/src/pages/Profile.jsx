import { Link } from "react-router-dom";
import '../css/Profile.css';
function Profile(){
    return (
  <div className="profile-container">

    <div className="profile-card">
      
      <div className="profile-top">
        <div className="profile-pic">
          <img src="" alt="Profile" />
        </div>
        <button className="upload-btn">Select Picture</button>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Your Name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Your Email" />
        </div>
      </form>

    </div>

    <div className="channel-section">
      <h3>Your Channels</h3>

      <div className="channel-links">
        <Link to="/listchannels" className="link-btn">
          Manage Channels
        </Link>

        <Link to="/newchannel" className="link-btn primary">
          + Create New Channel
        </Link>
      </div>
    </div>

  </div>
);
}
export default Profile;