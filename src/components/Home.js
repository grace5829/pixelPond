import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { storage } from "../firebase-config";
import { UserAuth } from "./AuthContext";
function Home() {
  const { user } = UserAuth();
// console.log(user)
  return (
    <div>
      <h1 className="appName">
      Pixel Pond                          
      </h1>   
    {user? 
    <div className="homeText">Welcome {user.displayName}!</div>: 
    <div className="homeText">Log in to create your legacy, one photo at a time</div>
    }
    <div className="homeText">
    Unlock your memories, with just a click!
    <div>
    {user ? 
    <Link to={`/${user.uid}/photoFolders`}>
          <img className="homeImage" src={require("../images/brain.png")}/>
    </Link>
     : 
        <Link to="/LogIn" >
              <img className="homeImage" src={require("../images/brain.png")}/>
    </Link>
      }

    </div>

        </div>
       </div>
  );
}

export default Home;
