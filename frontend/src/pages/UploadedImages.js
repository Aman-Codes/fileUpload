import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const UploadedImages = () => {
  const [urls, setUrls] = useState([]);
  const auth = useAuth();
  const id = auth.user._id;
  const token = auth.token;
  useEffect(() => {
    axios.get(`/api/images/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log("data is", response.data);
      setUrls(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return <>
    {(urls && urls.length) ? <div>
      {urls.map(url => <img src={url} alt="uploaded file" height="300" width="300" />)  }
    </div>: <p> No images found</p>}
  </>
};

export default UploadedImages;