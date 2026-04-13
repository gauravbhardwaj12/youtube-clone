import { useState,useEffect } from "react";

function Comment({videoId}){
    //const [comments,setComments]=useState([]);
    //const [text,setText]=useState("");
    const [comments,setComments]=useState([]);
    const [text,setText]=useState("");

    // ✅ Fetch comments
  useEffect(() => {
    fetch(`http://localhost:3200/videos/${videoId}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, [videoId]);

  // Add comment
  const handleComment = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3200/videos/${videoId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setComments(data.comments); // update UI
      setText("");
    }
  };

    return(<>
    <div>
      <h3>Comments</h3>

      {/* Add Comment */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleComment}>Post</button>

      {/* Show Comments */}
      {comments.map((c) => (
        <div key={c.commentId} style={{ marginTop: "10px" }}>
          <p><b>{c.userId?.username}</b></p>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
    </>)
}

export default Comment;