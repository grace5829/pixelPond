// import logo from './assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { UserAuth } from "./AuthContext";
import '../assets/navbar.css';
function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
    navigate('/')

  };
  return (
    <nav id="topNav">
      {/* <img src={folder}/> */}
      <img className="logo" src={require("../images/camera.png")}/>
      {/* <Link to="/uploadImages">Upload Images</Link>{" "} */}
      <Link to="/" className="navLink">Home</Link>
      {user ? (
        <>
        <Link to={`/${user.uid}/photoFolders`} className="navLink">Folders</Link>
        {/* <Link className="navLink">Favorites</Link> */}
        <div id="navRight">
        <span > {user.displayName} </span>
        <span onClick={handleLogOut} id="logOut" >Log out</span>
        </div>
        </>
      ) : (
        <Link to="/LogIn" className="navLink">Log In</Link>
      )}
    </nav>
  );
}

export default Navbar;
