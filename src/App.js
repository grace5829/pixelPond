// import logo from './assets/logo.svg';
import "./assets/App.css";
import { useState, useEffect } from "react";
import { storage } from "./firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function App() {
  const [images, setImages] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);


  const handleUpload = () => {
    if (images == []) return;
//     const uploadEach= () =>{
// const arr= Array.from(images)
// console.log("arr:",arr)
Object.values(images).forEach((image)=>{
        console.log("image 0:",image)
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        console.log("imageRef", imageRef);
        uploadBytes(imageRef, image).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url)=>{
            
            setImageList((prev) => [...prev, url]);
          })
        });  
      })
    // }
    // uploadEach()
  };
console.log("images:",images)
  return (
    <div className="App">
      <h1>
        Story of my life stolen moments Fotomates picture me now my photo stash
      </h1>
      {/* the 0 is for 1 image. remove to uploaod multiple */}
      <input
        type="file"
        multiple
        onChange={(evt) => {
          setImages(evt.target.files);
        }}
      />
      <button onClick={handleUpload}>Upload </button>
      {imageList.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default App;
