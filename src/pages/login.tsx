import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login=()=>{
    const navigate=useNavigate()

const signInWithGoogle= async()=>{
const result =await signInWithPopup(auth,provider);
navigate("/")

}

    return  <div className="row">
  <div className="col left">

    <p><small>
    Sign In With Google To Continue:
    </small></p>
  </div>
  <div className="col right">
   <button onClick={signInWithGoogle} className="btn plus" data-provider="google plus"><span className="i"><i></i></span><span>Google Plus</span></button>
  </div>
</div>
 
}