import {
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import RequireAdminAuth from "./components/RequireAdminAuth";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UploadedImages from "./pages/UploadedImages";
import AllImages from "./pages/AllImages";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/uploaded_images"
            element={
              <RequireAuth>
                <UploadedImages />
              </RequireAuth>
            }
          />
          <Route
            path="/all_images"
            element={
              <RequireAdminAuth>
                <AllImages />
              </RequireAdminAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;