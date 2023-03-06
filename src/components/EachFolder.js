// import logo from './assets/logo.svg';
import { Route, Routes, useParams } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload, PhotoFolders, Home, LogIn } from './index';

function EachFolder() {
  const { albumName } = useParams();

  return (
<div>
    <h1>{albumName}</h1>
<ImageUpload/>
</div>
  );
}

export default EachFolder;