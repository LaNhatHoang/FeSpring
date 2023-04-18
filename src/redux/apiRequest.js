import axios from "axios";
import { registerFailed, registerStart, registerSuccess } from "./authSlice";

export const baseUrl = "http://localhost:8080"

// export const loginUser = async(user, dispatch, navigate)=>{
//     dispatch(loginStart());
//     try{
//         const res = await axios.post(`${baseUrl}/api/v1/auth/login`, user)
//         if(res.data.status){
//             dispatch(loginSuccess(res.data))
//         }
//         dispatch(loginFailed(res.data.message))
//     }catch(err){
//         dispatch(loginFailed())
//     }
// }

export const registerUser = async(user, dispatch, navigate)=>{
    dispatch(registerStart())
    try{
        const res = await axios.post(`${baseUrl}/api/v1/auth/register`, user)
        dispatch(registerSuccess(res.data))
        if(res.data.status){
            setTimeout(()=> navigate("/login"), 3000)
        }
        // setTimeout(()=> navigate("/login"), 3000)
        // navigate("/login")
    }catch(err){
        dispatch(registerFailed())
    }
}

