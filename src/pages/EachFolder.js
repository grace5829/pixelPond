import { useParams } from "react-router-dom";
import "../assets/App.css";
import { ImageUpload } from "./index";

function EachFolder() {
  const { albumName } = useParams();

  return (
    <div>
      <h1>{albumName}</h1>
      <ImageUpload />
    </div>
  );
}

export default EachFolder;
