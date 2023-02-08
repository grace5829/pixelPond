// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import { UserAuth } from "./AuthContext";
import  { ImageUpload, PhotoFolders, Home, LogIn, EachFolder, EachImage } from './index';

function AppRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
       {/* <Route path="/uploadImages" element={<ImageUpload/>}/> */}
       <Route path="/:userId/photoFolders" element={<PhotoFolders/>}/>
       <Route path="/:userId/albums/:albumName" element={<EachFolder/>}/>
       <Route path="/albums/:albumName/photo/:imageName" element={<EachImage/>}/>
       <Route path="/LogIn" element={<LogIn/>}/>
       <Route path="/" element={<Home/>}/>
    </Routes>
  );
}

export default AppRoutes;
