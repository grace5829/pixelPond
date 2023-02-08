import { Link, useParams } from "react-router-dom";
import { auth, db } from "../firebase-config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { UserAuth } from "./AuthContext";
import '../assets/folders.css';

function PhotoFolders() {
  const { userId } = useParams();
  
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const albums = collection(db, `albums/${userId}/personalAlbums`);
  // const album=doc(db, "albums" user.uid, "personalAlbums")
let nameNewFolder= {folder: newFolder}
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    let albumFolders = await getDocs(albums);  
    setFolders((prev)=> 
      albumFolders.docs.map((doc) => 
      ({ ...doc.data(), folder: doc.id })
      )
    );
  };


  const handleNewFolder=async ()=>{
        const newAlbum = await setDoc(doc(db,"albums", userId,"personalAlbums", newFolder), {
        })
        setFolders((prev)=> [...prev, nameNewFolder])
  }

  return (
    <div>

      <button onClick={(evt)=>handleNewFolder()}>Add folder</button>
      <input value={newFolder} onChange={(e)=> setNewFolder(`${e.target.value}`) }/>
      <div className="folderArea">

      {folders
        ? // folders.map((folder)=>console.log(folder))
        folders.map((folder) => (
          <div className={`eachFolder`} key={v4()}>
            <Link key={folder.folder} to={`/${userId}/albums/${folder.folder}`}>
            <div className="folderName">  
                {folder.folder} 
              </div>
              </Link>
            </div>
          ))
          : null}
          </div>
    </div>
  );
}

export default PhotoFolders;
