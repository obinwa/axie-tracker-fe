// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";

import TableActions from "./../components/table-filter";
import Table from "../components/table";
import Pagination from "./../components/pagination";
import Modal from "../components/UI/modal";
import Button from "../components/UI/button";
import Input from "./../components/UI/input";
import AddForm from "./../components/addform";

import { inputChangeHandler } from "../helpers/changeHandler";
import { required } from "../helpers/validation";
import LoaderContext from "../loaderContext";
import { addMembership, handleShowActions } from "../helpers/mappedArray";
import { numberCheck } from "../helpers/validation";

import date from "../assets/date.svg";
import name from "../assets/name.svg";
import phone from "../assets/phone.svg";
import location from "../assets/location.svg";
import add from "../assets/add.svg";

import pagination from "../helpers/pagination";

import config from "../config";

const Dashboard = () => {

  const [customerForm, setCustomerForm] = useState({
    name: {
      label: "Name",
      placeholder: "John Doe",
      svg: name,
      value: "",
      elementType: "input",
      type: "text",
      validations: [required],
      isValid: false,
    },
    dob: {
      label: "Date of Birth",
      placeholder: "12/02/2020",
      svg: date,
      value: "",
      elementType: "input",
      type: "date",
      validations: [],
      isValid: true,
    },
    anniversary: {
      label: "Anniversary Date",
      placeholder: "12/02/2020",
      svg: date,
      value: "",
      elementType: "input",
      type: "date",
      validations: [],
      isValid: true,
    },
    mobile: {
      label: "Mobile Number",
      value: "",
      placeholder: "Enter Phone Number",
      svg: phone,
      elementType: "input",
      type: "text",
      validations: [numberCheck],
      isValid: false,
    },
    address: {
      label: "Address",
      placeholder: "B 204 Apple Revenue nr Surat Gujarat , India",
      svg: location,
      value: "",
      elementType: "input",
      type: "text",
      validations: [required],
      isValid: false,
    },
    
  });

  // COMPONENT STATES
  const [scholars, setScholars] = useState([]);

  const [dashboard, setDashboard] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  const [slicedCustomers, setSlicedCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const [currPage, setCurrPage] = useState(1);

  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //FETCH DATA
  async function fetchData() {
    try {
      setIsLoading(true);
      let url = `${config.baseUrl}players/update`;
      let scholarResponse = await axios.get(url);
  
      setScholars(scholarResponse.data);
      setIsLoading(false);
      setErrorMsg("");
    } catch (error) {
      setIsLoading(false);
    }
  }

  // SHOW DATA

  const showDataHandler = (evt, category) => {
    evt.stopPropagation();
    const data = dashboard.find((item) => item.title === category);
    const mappedArray = addMembership(data.data);
    setSlicedCustomers(mappedArray.slice(0, 5));
    setAllCustomers(mappedArray);
  };

  const showActionsHandler = (evt, id) => {
    evt.stopPropagation();
    handleShowActions(id, allCustomers, setAllCustomers);
  };


  // DELETE CUSTOMER

  const deleteCustomerHandler = async (evt, id) => {
    handleShowActions(null, allCustomers, setAllCustomers);
    evt.stopPropagation();
    const request = window.confirm(
      "Are you sure you want to delete this customer"
    );
    if (request) {
      try {
        setIsLoading(true);
        await axios.delete(`/api/v1/customers/${id}`);
        setIsLoading(false);
        fetchData();
      } catch (error) {
        setErrorMsg("Error Deleting User");
        setIsLoading(false);
      }
    }
  };

  // EDIT CUSTOMER

  const showEditHandler = (evt, id) => {
    setSelectedID(id);
    evt.stopPropagation();
    handleShowActions(null, allCustomers, setAllCustomers);
    setShowForm(true);
    const selectedCustomer = allCustomers.find((item) => item._id === id);
    setCustomerForm((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          value: selectedCustomer.name,
          isValid: true,
        },
        mobile: {
          ...prevState.mobile,
          value: selectedCustomer.mobile,
          isValid: true,
        },
      };
    });
  };

  const submitEditFormHandler = async (evt) => {
    evt.preventDefault();
    if (!formValid) {
      evt.preventDefault();
      return;
    }
    try {
      setIsLoading(true);
      const values = {};
      for (let key in customerForm) {
        values[key] = customerForm[key].value;
      }
      await axios.put(`/api/v1/customers/${selectedID}`, values);
      setShowForm(false);
      fetchData();
    } catch (error) {}
  };

  // PAGINATION

  const handlePagination = (num) => {
    setCurrPage(num);
    pagination(num, allCustomers, setSlicedCustomers);
  };

  const nextButton = () => {
    if (currPage === Math.ceil(allCustomers.length / 5)) {
      return;
    } else {
      const nextPage = currPage + 1;
      setCurrPage(nextPage);
      pagination(nextPage, allCustomers, setSlicedCustomers);
    }
  };
  const prevButton = () => {
    const prevPage = currPage - 1;
    if (prevPage < 1) {
      return;
    } else {
      setCurrPage(prevPage);
      pagination(prevPage, allCustomers, setSlicedCustomers);
    }
  };

  // FORM GENERATION
  const formArr = [];
  for (let key in customerForm) {
    formArr.push({
      id: key,
      config: customerForm[key],
    });
  }

  //UPDATE SCHOLAR 
  const updateScholar = async (evt) => {

      try {
      setIsLoading(true);
      let url = `${config.baseUrl}players/update`;
      let scholars = await axios.get(url);
      setScholars(scholars.data);
      setIsLoading(false);
      console.log(scholars.data);
    } catch (error) {
      setIsLoading(false);
    }
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
      readonly={config.readonly}
    />
  ));

  return (
    <>
      {showForm && (
        <AddForm
          title={"Edit Form"}
          onclick={() => setShowForm(false)}
          form={form}
          submitForm={submitEditFormHandler}
        />
      )}
      {errorMsg !== "" && (
        <Modal>
          <div className="modal_container">
            <div className="modal_content">
              <p>{errorMsg}</p>
              <Button bgColor="button-blue" onclick={fetchData}>
                Continue
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <section
        className="dashboard"
        onClick={() => handleShowActions(null, allCustomers, setAllCustomers)}
      >
        <div className="container">
          <div className="dashboard__list">
            {dashboard.map((item) => (
              <div
                className="dashboard__item"
                key={item.title}
                onClick={(evt) => showDataHandler(evt, item.title)}
              >
                <p className="title">{item.title}</p>
                <p className="value">{item.data.length}</p>
              </div>
            ))}
          </div>
          <div className="dashboard__table">
            <div className="dashboard__table-container">
              <h3 className="dashboard__table-header">Scholar List</h3>
              <div className="dashboard__table-actions">
                <TableActions
                  filterForm={null}
                  setFilterForm={null}
                  searchHandler={scholars}
                >
                  <Link to="/customer" className={" button button-blue"}>
                    <img src={add} alt="add" />
                    <span>Add New Scholar</span>
                  </Link>
                </TableActions>
              </div>
              <Table
                data={scholars}
                component="Dashboard"
                showActions={showActionsHandler}
                showTransaction={() => {}}
                showDelete={deleteCustomerHandler}
                showEditForm={showEditHandler}
              />
            </div>
          </div>
          <Pagination
            length={allCustomers.length}
            paginate={handlePagination}
            prevBtn={prevButton}
            nextBtn={nextButton}
            currPage={currPage}
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
