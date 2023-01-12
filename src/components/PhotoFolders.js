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
} from "firebase/firestore";
import { useEffect, useState } from "react";
function PhotoFolders() {
  const [folders,setFolders]=useState([])
  const albums=collection(db, "albums")

useEffect(()=>{
fetchAlbums()
},[])

  const fetchAlbums= async () =>{
  const albumFolders=await getDocs(albums)
  setFolders(albumFolders.docs.map((doc) => ({ ...doc.data(), folder: doc.id })))
}
console.log("albums", folders)

  // console.log("albums", folders)
  return (
    <div>
{folders? 

// folders.map((folder)=>console.log(folder)) 
folders.map((folder)=> <div>{folder.folder} </div>) 
:null}
    </div>
  );
}

export default PhotoFolders;
