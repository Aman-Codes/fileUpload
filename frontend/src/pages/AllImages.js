import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const AllImages = () => {
  const [users, setUsers] = useState([]);
  const auth = useAuth();
  const token = auth.token;
  useEffect(() => {
    axios.get(`/api/images/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log("data is", response.data);
      setUsers(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return <>
    {(users && users.length) ?<div>
      {users.map(user => <>
      <h3>{user.name}</h3>
      {user.imageUrls.map(url => <img src={url} alt="uploaded file" height="300" width="300" />)}
      <br/>
      </>)  }
    </div>: <p>No Images found</p>}
  </>
};

export default AllImages;