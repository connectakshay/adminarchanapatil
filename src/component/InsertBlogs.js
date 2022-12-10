import React, {useState} from 'react';
import { useRef } from 'react';
import Resizer from "react-image-file-resizer";
import './InsertBlogs.css';
import axios from 'axios';

const InsertBlogs = () => {

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [location, setLocation] = useState();
    const [caption, setCaption] = useState(); 
    const [date, setDate] = useState();
    const imageRef = useRef();

    console.warn(title);

// -----------------------------------upload blog-------------------------------------------

    const uploadBlog = async (e) => {

      e.preventDefault();
  
      let formData = new FormData();
      formData.append("caption", caption);
      formData.append("title", title);
      formData.append("location", location);
      formData.append("photo", image);
      formData.append("date", date);
  
  
      let config = {
        headers: "Content-Type': 'multipart/form-data"
      }
  
      e.preventDefault();
  
        const res = await axios.post("http://localhost:5000/uploadblog", formData, config)
        console.warn(res);
        if (res) {
          alert("Your Image Successfully upload");
        }
        else {
          alert("There is Problem to upload");
        }
        setTitle("");
        setCaption("");
        setLocation("");
        setDate("");
        imageRef.current.value = "";
        setImage(null);
  }

    const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "JPEG",
        120,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const imageResize = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
    } catch (err) {
      console.warn(err);
    }
  };


    return (
        <>
            <form className="blog-form">
                <h1>Upload Blog</h1>
                <label for="title">Title :</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
                <label for="location">Location :</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required/><br />
                <label for="desc">Blog Description :</label><br/>
                <textarea name="" value={caption} id="caption" cols="30" rows="5" placeholder='Write Image Caption' onChange={(e) => setCaption(e.target.value)} required/><br/>
                <input type="file" name="photo" ref={imageRef} accept=".png, .jpg, .jpeg" onChange={(e) => imageResize(e)} required/><br />
                <label>Date :</label>
                <input type="date" value={date} onChange={ (e) => setDate(e.target.value) } required/>
                <input type="submit" value="Upload Data" onClick={ (e) => uploadBlog(e) } required/>
            </form>
        </>
    )
}

export default InsertBlogs