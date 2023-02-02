// import logo from './assets/logo.svg';
import "../assets/App.css";
import { useState, useEffect } from "react";
import { db, storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL, getBytes } from "firebase/storage";
import { v4 } from "uuid";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import FileDownload from "js-file-download"
import {saveAs} from "file-saver";

// import Axios from "axios"
function ImageUpload() {
  const [images, setImages] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const albumFolders = collection(db, "albums");
  // const data = doc(db, "worms", props.userId, "journal", entry.id);
  const data = doc(db, "albums", "folder1");

  const fetchImages = async () => {
    try {
      const datas = await getDoc(data);
      console.log(datas.data());
      Object.values(datas.data()).forEach((imageUrl) => {
        setImageList((prev) => [...prev, imageUrl]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = () => {
    if (images == []) return;
    let obj = {};
    Object.values(images).forEach((image) => {
      console.log("image 0:", image);
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      console.log("imageRef", imageRef);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(image.name);
          let newName = image.name.replace(".", " ");
          // obj[image.name]=url
          obj[newName] = url;
          // updateDoc allows us to override info in DB or add info without erasing previously data
          //we can use setDoc if we always want to erase all informaiton
          updateDoc(data, obj);
        });
      });
    });
  };

  const download = async (url) => {
    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = 'todo-1.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      // alert('your file has downloaded!'); // or you know, something with better UX...
    })
    .catch(() => alert('oh no!'));
  
  };

  return (
    <div className="App">
      <h1>
        Story of my life stolen moments Fotomates picture me now my photo stash
      </h1>
      <input
        type="file"
        multiple
        onChange={(evt) => {
          setImages(evt.target.files);
        }}
      />
      <button onClick={handleUpload}>Upload </button>
      <div className="folderImagesArea">
        {imageList.map((url) => (
          <>
            <div className="eachImageArea">
              <a href={url} download="test"> link </a> 
              <button className="imageButton" onClick={(e) => download(url)} >
                download
              </button>
              <img src={url} className="folderImages" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
