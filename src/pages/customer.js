// @ts-nocheck
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LoaderContext from "../loaderContext";

import Input from "./../components/UI/input";
import Modal from "../components/UI/modal";
import Button from "./../components/UI/button";

import { required, numberCheck } from "../helpers/validation";
import { inputChangeHandler } from "./../helpers/changeHandler";

import location from "../assets/location.svg";
import phone from "../assets/phone.svg";
import date from "../assets/date.svg";
import name from "../assets/name.svg";
import config from "../config";

const Customer = (props) => {
  const [customerForm, setCustomerForm] = useState({
    name: {
      label: "Name",
      placeholder: "John Doe",
      // svg: name,
      value: "",
      elementType: "input",
      type: "text",
      validations: [],
      isValid: false,
    },
    roninAddress: {
      label: "roninAddress",
      placeholder: "ronin:...",
      //svg: name,
      value: "",
      elementType: "input",
      type: "text",
      validations: [],
      isValid: false,
    },

    percentage: {
      label: "percentage",
      placeholder: "",
      //svg: date,
      value: "",
      elementType: "input",
      type: "text",
      validations: [],
      isValid: true,
    },
    
  });

  const [valid, setFormValid] = useState(false);

  const { setIsLoading } = useContext(LoaderContext);
  const [msg, setMsg] = useState("");

  // Create new Customer

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!valid) {
      evt.preventDefault();
      return;
    } else {
      try {
        setIsLoading(true);
        const values = {};
        for (let key in customerForm) {
          values[key] = customerForm[key].value;
        }

        let url = `${config.baseUrl}player`;
        let playerProfile = await axios.post(url,values);
        // let playerProfile =  await axios.post("http://localhost:3300/axie-scholar-management/player", values);

        setIsLoading(false);
        setMsg("Scholar has been added");
      } catch (error) {
        setIsLoading(false);
        setMsg("Error adding scholar, try again");
      }
    }
  };

  // Form Generation
  const formArr = [];
  for (let key in customerForm) {
    formArr.push({
      id: key,
      config: customerForm[key],
    });
  }

  const form = formArr.map(({ id, config }) => (
    <Input
      key={id}
      elementType={config.elementType}
      value={config.value}
      label={config.label}
      svg={config.svg}
      placeholder={config.placeholder}
      type={config.type}
      onchange={(evt) =>
        inputChangeHandler(evt, id, customerForm, setCustomerForm, setFormValid)
      }
      msg={config.msg}
      valid
    />
  ));

  return (
    <>
      {msg !== "" && (
        <Modal>
          <div className="modal_container">
            <div className="modal_content">
              <p>{msg}</p>
              <Link to="/" className="button button-blue">
                Proceed to Dashboard
              </Link>
            </div>
          </div>
        </Modal>
      )}
      <section className="customer">
        <div className="customer__container">
          <h3 className="page-title">Add New Scholar</h3>
          <form className="customer__form" onSubmit={handleSubmit}>
            <div className="customer__form-container">
              {form}
              <Button type="submit" bgColor={"button-blue"}>
                Add 
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Customer;
