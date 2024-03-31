import { useHistory } from "react-router-dom";
import {toast} from 'react-toastify'
export const useLogout = ()=>{
    const history = useHistory()

    return async ()=>{
        await toast.success("Logged Out Successfully")
        sessionStorage.clear()
        history.push('/'); 
    }
}
