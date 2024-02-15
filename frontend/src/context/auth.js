import {useContext, createContext} from "react";

const AuthContext = createContext(null);

const useAuth = () => {
  return useContext(AuthContext);
}

export {AuthContext, useAuth};