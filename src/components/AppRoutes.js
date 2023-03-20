// import logo from './assets/logo.svg';
import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import { UserAuth } from "./AuthContext";
import { PhotoFolders, Home, LogIn, EachFolder, EachImage } from "./index";

function AppRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
      <Route path="/:userId/photoFolders" element={<PhotoFolders />} />
      <Route path="/:userId/albums/:albumName" element={<EachFolder />} />
      <Route
        path="/:userId/albums/:albumName/photo/:imageName"
        element={<EachImage />}
      />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
