import React, { useState } from 'react';
import { useRef } from 'react';
import Resizer from "react-image-file-resizer";
import './InsertImages.css';
import axios from 'axios';

const InsertImages = () => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [caption, setCaption] = useState();
  const imageRef = useRef();
  // console.warn(image);
  // ---------------------------data upload-------------------------------------


  const uploadImage = async (e) => {

    e.preventDefault();

    let formData = new FormData();
    formData.append("caption", caption);
    formData.append("title", title);
    formData.append("photo", image);


    let config = {
      headers: "Content-Type': 'multipart/form-data"
    }

    e.preventDefault();

      const res = await axios.post("http://localhost:5000/uploadimage", formData, config)
      console.warn(res);
      if (res) {
        alert("Your Image Successfully upload");
      }
      else {
        alert("There is Problem to upload");
      }
      setTitle("");
      setCaption("");
      imageRef.current.value = "";
      setImage(null);
}

// --------------------------------data upload-------------------------------------------


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        "JPEG",
        200,
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
      <form className="image-form">
        <h1>Upload Images</h1>
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <textarea name="" id="caption" cols="30" rows="5" value={caption} placeholder='Write Image Caption' onChange={(e) => setCaption(e.target.value)} />
        <input type="file" name="photo" ref={imageRef} accept=".png, .jpg, .jpeg" onChange={(e) => imageResize(e)} /><br />
        <input type="submit" onClick={ (e) => uploadImage(e) } value="Upload Image" />
      </form>
    </>
  )
}

export default InsertImages