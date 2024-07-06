import { Route, Routes } from "react-router-dom";
import "../assets/App.css";
import { PhotoFolders, Home, LogIn, EachFolder, EachImage } from "./index";

function AppRoutes() {
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
