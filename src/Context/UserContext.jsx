import React, { useState, useEffect } from "react";
import AxiosService from "../Utils/AxiosService";
export const UserContextComponent = React.createContext(null);

function UserContext({ children }) {
  const [user, setUser] = useState();

  const getData = async () => {
    try {
      let _id = sessionStorage.getItem("userId");
      const res = await AxiosService.get(`/user/${_id}`);
      if (res.status === 200) {
        setUser(res.data.user);
        console.log(res.data.user)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContextComponent.Provider value={{ user, setUser }}>
      {children}
    </UserContextComponent.Provider>
  );
}

export default UserContext;
