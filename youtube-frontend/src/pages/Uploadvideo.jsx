import { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/Uploadvideo.css';

function Uploadvideo(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [url,setUrl]=useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState(null);
    const token=localStorage.getItem("token");
    const {id}=useParams();
    function handleuploadvideo(e){
       
       e.preventDefault();
        const formData = new FormData();
        formData.append("channelId",id);
        formData.append("title",title);
        formData.append("description",description);
        formData.append("videoUrl",url);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("thumbnail", file); 
        console.log(formData.entries());
            try{
                fetch("http://localhost:3200/user/channel/uploadvideo",{
                    method:"POST",
                    headers:{
                        Authorization:`JWT ${token}`
                    },
                    body:formData,
                })
                .then((d)=>d.json())
                .then((data)=>{console.log(data);})
                .catch((e)=>console.log("error",e));

            }
            catch (err){
                console.log(err);

            }
    }
    return (
  <div className="upload-container">

    <form className="upload-card" onSubmit={handleuploadvideo}>
      
      <h2>Upload Video</h2>

      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          placeholder="Enter video title"
          onChange={(e)=>setTitle(e.target.value)} 
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea 
          placeholder="Enter video description"
          onChange={(e)=>setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>YouTube URL</label>
        <input 
          type="url" 
          placeholder="Paste video URL"
          onChange={(e)=>setUrl(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Thumbnail</label>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Music">Music</option>
          <option value="Gaming">Gaming</option>
          <option value="Tech">Tech</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tags</label>
        <input 
          type="text" 
          placeholder="e.g. coding, react, tutorial"
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
        />
      </div>

      <button className="upload-btn">Upload Video</button>

    </form>

  </div>
);
}

export default Uploadvideo;