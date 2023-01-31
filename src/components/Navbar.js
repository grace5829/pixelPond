// import logo from './assets/logo.svg';
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { UserAuth } from "./AuthContext";

function Navbar() {
  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      {/* <Link to="/uploadImages">Upload Images</Link>{" "} */}
      <Link to="/photoFolders">Folders</Link>
      <Link to="/">Home</Link>
      {user ? (
        <>
        <span>Welcome {user.displayName}</span>
        <button onClick={handleLogOut}>Log out</button>
        </>
      ) : (
        <Link to="/LogIn">Log In</Link>
      )}
    </nav>
  );
}

export default Navbar;
