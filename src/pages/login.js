import { useState } from "react";
import axios from "axios";

import Input from "../components/UI/input";
import Button from "../components/UI/button";
import Modal from "../components/UI/modal";
import Loader from "../components/UI/loader";

import { inputChangeHandler } from "../helpers/changeHandler";

import logo from "../assets/diamond.svg";

const Login = (props) => {
  const [loginform, setLoginForm] = useState({
    email: {
      label: "Email Address",
      placeholder: "Email Address",
      elementType: "input",
      type: "email",
      validations: [],
      value: "",
      isValid: false,
    },
    password: {
      label: "Password",
      placeholder: "*******",
      value: "",
      elementType: "input",
      type: "password",
      validations: [],
      isValid: false,
    },
  });

  const [formValid, setFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!formValid) {
      evt.preventDefault();
      return;
    } else {
      setLoading(true);
      const login = {};
      for (let key in loginform) {
        login[key] = loginform[key].value;
      }
      try {
        const res = await axios.post("/api/v1/users/login", login);
        setLoading(false);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("email", res.data.data.user.email);
        sessionStorage.setItem("name", res.data.data.user.name);
        props.history.push("/");
      } catch (error) {
        setLoading(false);
        if (error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Error connecting with our server, pls try again");
        }
      }
    }
  };



  const formArr = [];

  for (let key in loginform) {
    formArr.push({
      key,
      config: loginform[key],
    });
  }

  let form = formArr.map(({ key, config }) => (
    <Input
      key={key}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      svg={config.svg}
      placeholder={config.placeholder}
      type={config.type}
      onchange={(evt) =>
        inputChangeHandler(evt, key, loginform, setLoginForm, setFormValid)
      }
    />
  ));

  return (
    <>
      {loading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <div className="login">
        <div className="login__container">
          <div className="login__logo">
            <img src={logo} alt="diamond house logo" />
          </div>
          <form className="login__form" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="login__form-container">
              {errorMsg !== "" && <p className="error">{errorMsg}</p>}
              {form}
              <Button bgColor="button-blue">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
