// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload, PhotoFolders, Home, LogIn } from './index';

function AppRoutes() {

  return (
    <Routes>
       <Route path="/uploadImages" element={<ImageUpload/>}/>
       <Route path="/photoFolders" element={<PhotoFolders/>}/>
       <Route path="/" element={<Home/>}/>
       <Route path="/LogIn" element={<LogIn/>}/>

    </Routes>
  );
}

export default AppRoutes;
