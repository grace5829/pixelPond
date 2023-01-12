import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
function PhotoFolders() {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const albums = collection(db, "albums");
let nameNewFolder= {folder: newFolder}
  useEffect(() => {
    fetchAlbums();
  }, []);


  const fetchAlbums = async () => {
    const albumFolders = await getDocs(albums);
    console.log(albumFolders.docs)
  
    setFolders((prev)=> 
      albumFolders.docs.map((doc) => 
      ({ ...doc.data(), folder: doc.id })
      )
    );
  };


  console.log("albums", folders);

  const handleNewFolder=async ()=>{
        const newAlbum = await setDoc(doc(db,"albums", newFolder), {
        })
        setFolders((prev)=> [...prev, nameNewFolder])
  }
  // console.log("albums", folders)
  return (
    <div>

      <button onClick={(evt)=>handleNewFolder()}>Add folder</button>
      <input value={newFolder} onChange={(e)=> setNewFolder(`${e.target.value}`) }/>
      {folders
        ? // folders.map((folder)=>console.log(folder))
          folders.map((folder) => (
            <div className="folderArea">
              <img className="folderImg" src={require("../images/folderpic.png")}/>
            <Link to={`/${folder.folder}`}>
            <div className="folderName">  
                {folder.folder} 
              </div>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
}

export default PhotoFolders;
