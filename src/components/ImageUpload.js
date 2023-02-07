// import logo from './assets/logo.svg';
import "../assets/App.css";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import FileDownload from "js-file-download";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Link, useParams } from "react-router-dom";
import { UserAuth } from "./AuthContext";

// import Axios from "axios"
function ImageUpload() {
  const [uploadImages, setUploadImages] = useState(null);
  const [imageList, setImageList] = useState({});
  const [selectedImages, setSelectedImages] = useState({});
  const { userId } = useParams();
  const { albumName } = useParams(); // STEP 2
  const imageListRef = ref(storage, "images/");
  const albumFolders = collection(db, `albums/${userId}/personalAlbums`);
  let folderName="folder2"
  // const data = doc(db, "worms", props.userId, "journal", entry.id);
  const data = doc(db, 'albums', userId, "personalAlbums", albumName);
  // const data = doc(db, 'albums', folderName);
  const aRef = useRef(null);
  const fetchImages = async () => {
    try {
      const datas = await getDoc(data);
      console.log(datas);
      Object.keys(datas.data()).forEach((name) => {
        // console.log(name + datas.data()[name] )
        setImageList((prev) => ({ ...prev, [name]: datas.data()[name] }));
      });
      // Object.values(datas.data()).forEach((imageUrl) => {
      //   setImageList((prev) => [...prev, imageUrl]);
      // });
    } catch (error) {
      console.log(error);
    }
    // setImageList({...sorted})
  };
  useEffect(() => {
    fetchImages();
  }, []);
console.log(imageList)
  const handleUpload = (e) => {
    if (uploadImages == null) return;
    let obj = {};
    Object.values(uploadImages).forEach((image) => {
      // console.log("image 0:", image);
      const imageRef = ref(storage, `images/${image.name.split(".")[0] + v4()}`);
      // console.log("imageRef", imageRef);
      let name = image.name;
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => ({ ...prev, [name.split(".")[0]]: url }));
          let newName = image.name.split(".")[0];
          // obj[image.name]=url
          obj[newName] = url;
          // updateDoc allows us to override info in DB or add info without erasing previously data
          //we can use setDoc if we always want to erase all informaiton
          updateDoc(data, obj);
        });
      });
    });
    aRef.current.value = null;
  };

  const download = async (fileName) => {
    fetch(imageList[fileName])
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = `${fileName}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // alert('your file has downloaded!'); // or you know, something with better UX...
      })
      .catch(() => alert("oh no!"));
  };

  const deleteImage = (test) => {
    let cost = test;
    setImageList((current) => {
      // remove cost key from object
      const copy = { ...current };
      delete copy[test];
      return copy;
    });
  };

  const checkedImages = (event) => {
    // if (document.querySelectorAll(event).checked){
    //   console.log(event)
    // }
    // setImageList((prev) => ({ ...prev,[name]: imageList[name] }));
    console.log(event);
  };
  // console.log("selectedIMAGES:", selectedImages);

  const downloadSelected = () => {
    Object.keys(selectedImages).forEach((image) => {
      fetch(selectedImages[image])
        .then((resp) => resp.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = `${image}.png`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          // alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert("oh no!"));
    });
  };

  let one="https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg"
  // console.log(imageList);
  const downloadAll = async () => {
    var zip = new JSZip();
    var img = zip.folder("images"); //images is the folder which will be zip
    img.file(`test.png`, imageList[one]);
    await Object.keys(imageList).forEach((image) => {
      // let picture= fetch(imageList[image])
      // .then((resp) => resp.blob())
      // .then((blob) => {
      //   const url = window.URL.createObjectURL(blob);
      //   const a = document.createElement("a");
      //   a.style.display = "none";
      //   a.href = url;
      //   // the filename you want
      //   a.download = `${image}.png`;
      //   document.body.appendChild(a);
      //   a.click();
      //    window.URL.revokeObjectURL(url)
      //   // alert('your file has downloaded!'); // or you know, something with better UX...
      // })
      // .catch(() => alert("oh no!"))
    });
    zip.generateAsync({type:"blob"}).then(function(content) {
      saveAs(content, "example.zip");
    });
  };

  return (
    <div className="App">

      <input
        type="file"
        multiple
        ref={aRef}
        onChange={(e) => {
          setUploadImages(e.target.files);
        }}
      />
      <button onClick={handleUpload}>Upload </button>
      <div>
        <button onClick={downloadSelected}>Download selected </button>
        <button onClick={(e)=>downloadAll(e)}>Download All </button>
      </div>

      <div className="folderImagesArea">
        {Object.keys(imageList).map( (name) => (
          <div className={"eachImageArea"} key={v4()}>
            <Link state={{ imageLink:`${imageList[name]}`, folder:`${folderName}`  }} to={`/${userId}/albums/folder1/photo/${name}`} key={name}>
            <div className={"eachImageName"}>{name}</div>
            </Link>
            <input type="checkbox" onChange={checkedImages} value={"false"} />
            <button
              className={"imageDownloadButton"}
              onClick={(e) => download(name)}
            >
              download
            </button>
            {/* <button className={"imageDeleteButton"} onClick={(e) => deleteImage(name)}>
              Delete
            </button> */}
            <img src={imageList[name]} className={"folderImages"} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
