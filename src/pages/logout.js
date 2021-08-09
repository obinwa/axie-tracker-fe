import { useEffect } from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userID");
  }, []);
  useEffect(() => {}, []);

  return <Redirect to="/login" />;
};

export default Logout;
