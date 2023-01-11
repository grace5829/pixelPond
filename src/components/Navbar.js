// import logo from './assets/logo.svg';
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
function Navbar() {

  return (
<nav>
    <Link to="/uploadImages">Upload Images</Link>
</nav>
  );
}

export default Navbar;
