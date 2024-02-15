import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import BackgroundImage from "../assets/images/background.png";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const token = auth.token;
  const handleFiles = (selectedfiles) => {
    console.log("files:", selectedfiles);
    const uploaded = [...files];
    selectedfiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    })
    setFiles(uploaded);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    console.log("files sent", files[0]);
    for (let i = 0 ; i < files.length ; i++) {
      formData.append("files", files[i]);
    }
    axios.post("/api/upload", formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      console.log("data is", response.data);
      if(!response.data.success) {
        setError(response.data.message);
        return;
      }
    })
    .catch(error => {
      console.log("error is", error);
      setError(error.data.message);
    })
    .finally(()=> {
      setLoading(false);
    })
  }
  return (
    <>
    <div
      className="form__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="form__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Upload Files</div>
        {/* ALert */}
        {error ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setError(null)}
            dismissible
          >
            {error}
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="files">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              const chosenFiles = Array.prototype.slice.call(e.target.files)
              handleFiles(chosenFiles);
            }}
            multiple
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Uploading...
          </Button>
        )}
      </Form>
    </div>
    </>
    
  );
};

export default Dashboard;