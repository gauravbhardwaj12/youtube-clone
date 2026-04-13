import { Link } from "react-router-dom";
function Videocard({video}){
    return(<>
    <div  className="item">
          
                <Link to={`/video/${video.videoId}`}>
                    <img src={video.thumbnailUrl} width="250" />
                    <p>{video.title}</p>
            </Link>
            
        </div>
    </>);
}

export default Videocard;