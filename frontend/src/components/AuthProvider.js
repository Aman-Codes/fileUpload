import {useState} from "react";
import { Authentication } from "../Authentication";
import {AuthContext} from "../context/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signin = (newUser, newToken, callback) => {
    return Authentication.signin(() => {
      setUser(newUser);
      setToken(newToken);
      callback();
    });
  };

  const signout = (callback) => {
    return Authentication.signout(() => {
      setUser(null);
      setToken(null);
      callback();
    });
  };

  const value = { user, token, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;