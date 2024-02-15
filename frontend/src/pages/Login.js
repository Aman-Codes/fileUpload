import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import BackgroundImage from "../assets/images/background.png";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios.post('/api/auth/login', {
      email,
      password
    })
    .then(response => {
      console.log("data is", response.data);
      if(!response.data.success) {
        setShow(true);
        return;
      }
      auth.signin(response.data.user, response.data.token, () => {
        navigate(from, { replace: true });
      });
    })
    .catch(error => {
      console.log("error is", error);
      setShow(true);
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
        <div className="h4 mb-2 text-center">Login</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" onClick={handleSubmit}>
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Logging In...
          </Button>
        )}
      </Form>
    </div>
    </>
    
  );
}

export default Login;