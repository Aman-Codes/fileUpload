import {
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../context/auth";
import Logo from "../assets/images/logo.svg";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar expand="lg" bg="secondary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          {/* <Navbar.Brand>Welcome {auth.user ? auth.user.name: ""}!{" "}</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {auth.token ? <Nav className="me-auto">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/uploaded_images" className="nav-link">Uploaded Images</Link>
              {console.log("user", auth.user)}
              {auth.user.isAdmin && <Link to="/all_images" className="nav-link">All Images</Link>}
              
            </Nav>:null}
            <Nav className="ms-auto">
              {auth.token ?
              <Navbar.Text className="nav-link"
              style={{cursor: "pointer"}}
              onClick={() => {
                auth.signout(() => navigate("/"));
              }}>Logout</Navbar.Text>
              :<>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
    
  );
}

export default Header;