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
import { v4 } from "uuid";
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
    setFolders((prev)=> 
      albumFolders.docs.map((doc) => 
      ({ ...doc.data(), folder: doc.id })
      )
    );
  };



  const handleNewFolder=async ()=>{
        const newAlbum = await setDoc(doc(db,"albums", newFolder), {
        })
        setFolders((prev)=> [...prev, nameNewFolder])
  }
  return (
    <div>

      <button onClick={(evt)=>handleNewFolder()}>Add folder</button>
      <input value={newFolder} onChange={(e)=> setNewFolder(`${e.target.value}`) }/>
      {folders
        ? // folders.map((folder)=>console.log(folder))
          folders.map((folder) => (
            <div className={`folderArea ${v4()}`} >
              <img className="folderImg" src={require("../images/folderpic.png")}/>
            <Link key={folder.folder} to={`/albums/${folder.folder}`}>
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
