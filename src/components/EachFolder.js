// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload, PhotoFolders, Home, LogIn } from './index';

function EachFolder() {

  return (
<div>
    <h1>Each Folder</h1>
<ImageUpload/>
</div>
  );
}

export default EachFolder;