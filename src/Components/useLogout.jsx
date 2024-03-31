import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
export const useLogout = ()=>{
    const navigate = useNavigate()

    return ()=>{
        toast.success("Logged Out Successfully")
        sessionStorage.clear()
        navigate('/')
    }
}
