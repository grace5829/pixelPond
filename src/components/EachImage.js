import { Link, Route, Routes, useParams } from "react-router-dom";
import "../assets/App.css";
import  { ImageUpload, PhotoFolders, Home, LogIn } from './index';
import { useLocation } from 'react-router-dom'

function EachImage(props) {
    const { imageName } = useParams(); // STEP 2
//     const { imageName } = props.image; // STEP 2
const location = useLocation()
const { imageLink, folderName } = location.state
// console.log(location)

const download = async () => {
    console.log(imageLink)
    fetch(imageLink)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = `${imageName}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        // alert('your file has downloaded!'); // or you know, something with better UX...
      })
      .catch(() => alert("oh no!"));
  };

  return (
<div>
    <h1>Each Image</h1>
    <Link to={`/albums/${folderName}`}>
        <div>Back</div>
    </Link>
    <img src={imageLink} className={"singleImage"} />
    <button onClick={(e)=>download(e)}>Download</button>

</div>
  );
}

export default EachImage;