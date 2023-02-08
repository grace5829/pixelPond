// import logo from './assets/logo.svg';
import "../assets/App.css";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Link, useParams } from "react-router-dom";
function ImageUpload() {
  const [uploadImages, setUploadImages] = useState(null);
  const [imageList, setImageList] = useState({});
  const [selectedImages, setSelectedImages] = useState({});
  const { userId } = useParams();
  const { albumName } = useParams();
  const imageListRef = ref(storage, "images/");
  const albumFolders = collection(db, `albums/${userId}/personalAlbums`);
  const data = doc(db, "albums", userId, "personalAlbums", albumName);
  const aRef = useRef(null);
  const fetchImages = async () => {
    try {
      const datas = await getDoc(data);
      console.log(datas);
      Object.keys(datas.data()).forEach((name) => {
        setImageList((prev) => ({ ...prev, [name]: datas.data()[name] }));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const handleUpload = (e) => {
    if (uploadImages == null) return;
    let obj = {};
    Object.values(uploadImages).forEach((image) => {
      const imageRef = ref(
        storage,
        `images/${image.name.split(".")[0] + v4()}`
      );
      let name = image.name;
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => ({ ...prev, [name.split(".")[0]]: url }));
          let newName = image.name.split(".")[0];
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

  const downloadAll = async () => {
    var zip = new JSZip();

    // block.packages is an array of items from the CMS
    const remoteZips = Object.keys(imageList).map(async (image) => {
      // pack.file.url is the URL for the .zip hosted on the CMS
      const response = await fetch(imageList[image]);
      const data = await response.blob();

      // pack.kitName is from a loop, replace with your file name.
      zip.file(`${image}.jpeg`, data);

      return data;
    });

    Promise.all(remoteZips).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `StoryOfMyLife.zip`);
      });
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
        <button onClick={(e) => downloadAll(e)}>Download All </button>
      </div>

      <div className="folderImagesArea">
        {Object.keys(imageList).map((name) => (
          <div className={"eachImageArea"} key={v4()}>
            <Link
              state={{
                imageLink: `${imageList[name]}`,
                folder: `${albumName}`,
              }}
              to={`/${userId}/albums/${albumName}/photo/${name}`}
              key={name}
            >
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
