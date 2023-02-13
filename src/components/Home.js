import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { storage } from "../firebase-config";
import { UserAuth } from "./AuthContext";
function Home() {
  const { user } = UserAuth();

  return (
    <div>
      <h1>
        Story of my life                             
      </h1>   
    {user? 
    <div>Logged in</div>: 
    <div>Logged out</div>
    }
    <div>
      The beginning of your story starts here! Save for generations to come.
    </div>
       </div>
  );
}

export default Home;
