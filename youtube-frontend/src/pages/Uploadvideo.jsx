import { useState } from "react";
import { useParams } from "react-router-dom";

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
    return(<>
    <form action="" onSubmit={handleuploadvideo}>
        <div>
            <label htmlFor="">Enter Title</label><input type="text" onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
            <label htmlFor="">Enter Description</label><input type="text" onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div>
            <label htmlFor="">Enter You Tube url</label><input type="url" onChange={(e)=>setUrl(e.target.value)} />
        </div>
        <div>
            <label htmlFor="">Thumbnail</label> <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        </div>
        <div><label htmlFor="">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Tech">Tech</option>
            </select>
        </div>
        <div><label htmlFor="">Tags</label>
        <input type="text" placeholder="Enter tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <input type="submit" value="upload" />
    </form>
    </>)
}

export default Uploadvideo;