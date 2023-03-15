import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from "./AuthContext"

function LogIn() {
    const {googleSignIn,user }=UserAuth()
    const navigate=useNavigate()
    const handleGoogleSignIn=async ()=>{
        try {
            await googleSignIn()
            
        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{{
      if (user !== null){

          navigate('/')
      } 
    }
    },[user])
return (
    <div className="login">
<GoogleButton onClick={handleGoogleSignIn}/>
    </div>
  );
}

export default LogIn;
