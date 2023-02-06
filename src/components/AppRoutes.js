// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload, PhotoFolders, Home, LogIn, EachFolder, EachImage } from './index';

function AppRoutes() {

  return (
    <Routes>
       {/* <Route path="/uploadImages" element={<ImageUpload/>}/> */}
       <Route path="/photoFolders" element={<PhotoFolders/>}/>
       <Route path="/albums/:albumName" element={<EachFolder/>}/>
       <Route path="/albums/:albumName/photo/:imageName" element={<EachImage/>}/>
       <Route path="/LogIn" element={<LogIn/>}/>
       <Route path="/" element={<Home/>}/>

    </Routes>
  );
}

export default AppRoutes;
