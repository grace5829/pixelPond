import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { storage } from "../firebase-config";
import { UserAuth } from "./AuthContext";
function Home() {
  const { user } = UserAuth();
console.log(user)
  return (
    <div>
      <h1>
        Story of my life                             
      </h1>   
    {user? 
    <div>Welcome {user.displayName}, this is your private online photo gallery!</div>: 
    <div>Log in to start your journey!</div>
    }
    <div>
      The beginning of your story starts here!
    </div>
       </div>
  );
}

export default Home;
