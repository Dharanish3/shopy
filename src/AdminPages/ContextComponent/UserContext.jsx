import React, { useState, useEffect } from "react";
import AxiosService from "../../Utils/AxiosService";
export const AdminContextComponent = React.createContext(null);



function UserContext() {
    const [admin,setAdmin] = useState();

    const getData = async() => {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getData()
    })
  return (
    <div>UserContext</div>
  )
}

export default UserContext