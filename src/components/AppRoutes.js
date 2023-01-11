// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload } from './index';

function AppRoutes() {

  return (
    <Routes>
       <Route path="/uploadImages" element={<ImageUpload/>}/>
    </Routes>
  );
}

export default AppRoutes;
