// @ts-nocheck
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoaderContext from "../loaderContext";

import SingleTransaction from "./single-transaction";

import Table from "./../components/table";
import Input from "./../components/UI/input";
import TableActions from "./../components/table-filter";
import Button from "./../components/UI/button";
import AddForm from "./../components/addform";
import Modal from "./../components/UI/modal";
import Pagination from "../components/pagination";

import { numberCheck } from "../helpers/validation";
import { inputChangeHandler } from "../helpers/changeHandler";
import { addMembership, handleShowActions } from "../helpers/mappedArray";
import pagination from "../helpers/pagination";

import addSvg from "../assets/add.svg";

const Transaction = () => {
  // Component States
  const [filterForm, setFilterForm] = useState({
    search: {
      type: "text",
      value: "",
      label: "Search Customer",
      placeholder: "Search a customer",
      validations: [],
    },
  });
  const [addForm, setAddForm] = useState({
    number: {
      label: "Customer Number",
      value: "",
      elementType: "input",
      placeholder: "Enter customer number",
      type: "text",
      validations: [numberCheck],
      isValid: false,
      msg: "",
    },
    description: {
      label: "Description",
      value: "",
      placeholder: "Enter a description",
      elementType: "textarea",
      validations: [],
      isValid: false,
      readonly: true,
    },
    price: {
      label: "Total Price",
      value: "",
      elementType: "input",
      type: "number",
      placeholder: "Enter Price",
      validations: [],
      isValid: false,
      readonly: true,
    },
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [slicedArr, setSlicedArr] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showActions] = useState(false);
  const [customerID, setCustomerID] = useState();
  const { setIsLoading } = useContext(LoaderContext);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // GET TRANSACTIONS

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await axios.get("api/v1/transactions");
      const mappedArr = addMembership(res.data.body.transactions);
      setSlicedArr(mappedArr.slice(0, 5));
      setTransactions(mappedArr);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (addForm.number.isValid) {
      fetchUserInfo();
    }
  }, [addForm.number.value]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `/api/v1/customers/phone/${addForm.number.value}`
      );
      setIsLoading(false);
      updateFn(`Customer name: ${res.data.body.customer.name}`);
      changeReadOnly(false);
      setCustomerID(res.data.body.customer._id);
    } catch (err) {
      setIsLoading(false);
      updateFn("No user with such record");
      changeReadOnly(true);
    }
  };

  const updateFn = (msg) => {
    setAddForm((prevState) => {
      return {
        ...prevState,
        number: {
          ...prevState["number"],
          msg,
        },
      };
    });
  };

  const changeReadOnly = (value) => {
    setAddForm((prevState) => {
      return {
        ...prevState,
        description: {
          ...prevState.description,
          readonly: value,
        },
        price: {
          ...prevState.price,
          readonly: value,
        },
      };
    });
  };

  const handleCreateTransaction = async (evt) => {
    evt.preventDefault();
    if (!formValid) {
      evt.preventDefault();
      return;
    } else {
      setIsLoading(true);
      const data = {
        customer: customerID,
        price: addForm.price.value,
        item: addForm.description.value,
      };
      try {
        await axios.post("/api/v1/transactions", data);
        for (let key in addForm) {
          setAddForm((prevState) => {
            return {
              ...prevState,
              [key]: {
                ...prevState[key],
                value: "",
              },
            };
          });
        }
        updateFn("");
        setIsLoading(false);
        setAdd(false);
        fetchData();
      } catch (error) {}
    }
  };

  // DELETE TRANSACTION

  const showDeleteAlert = async (evt, id) => {
    evt.stopPropagation();
    handleShowActions(null, transactions, setTransactions);
    const request = window.confirm("Ae you sure you want to delete");
    if (request) {
      setIsLoading(true);
      await axios.delete(`/api/v1/transactions/${id}`);
      setIsLoading(false);
      fetchData();
    }
  };

  // SHOW SINGLE CUSTOMER TRANSACTION
  const showCustomerTransaction = (evt, id) => {
    evt.stopPropagation();
    handleShowActions(null, transactions, setTransactions);
    setCustomerID(id);
    setShow(true);
  };

  const showActionsHandler = (evt, id) => {
    evt.stopPropagation();
    handleShowActions(id, transactions, setTransactions);
  };

  // SEARCH TRANSACTION

  const customerSearchHandler = async (evt) => {
    evt.preventDefault();
    const res = await axios.get(
      `/api/v1/customers/search/${filterForm.search.value}`
    );
    setFilterForm((prevState) => {
      return {
        ...prevState,
        search: {
          ...prevState.search,
          value: "",
        },
      };
    });
    const mappedArr = addMembership(res.data.body.customer);
    setTransactions(mappedArr);
    setSlicedArr(mappedArr.slice(0, 5));
  };

  // Form Generations
  const formArr = [];
  for (let key in addForm) {
    formArr.push({ id: key, config: addForm[key] });
  }
  const form = formArr.map(({ id, config }) => (
    <Input
      key={id}
      value={config.value}
      label={config.label}
      placeholder={config.placeholder}
      elementType={config.elementType}
      type={config.type}
      onchange={(evt) =>
        inputChangeHandler(evt, id, addForm, setAddForm, setFormValid)
      }
      readonly={config.readonly}
      msg={config.msg}
    />
  ));

  // PAGINATION
  const handlePagination = (num) => {
    setCurrPage(num);
    pagination(num, transactions, setSlicedArr);
  };

  const nextButton = () => {
    if (currPage === Math.ceil(transactions.length / 5)) {
      return;
    } else {
      const nextPage = currPage + 1;
      setCurrPage(nextPage);
      pagination(nextPage, transactions, setSlicedArr);
    }
  };
  const prevButton = () => {
    const prevPage = currPage - 1;
    if (prevPage < 1) {
      return;
    } else {
      setCurrPage(prevPage);
      pagination(prevPage, transactions, setSlicedArr);
    }
  };

  return (
    <>
      {show && (
        <Modal>
          <SingleTransaction id={customerID} close={() => setShow(false)} />
        </Modal>
      )}
      {add && (
        <AddForm
          title={"Add Transaction"}
          onclick={() => setAdd(false)}
          form={form}
          submitForm={handleCreateTransaction}
        />
      )}
      <section
        className="transaction"
        onClick={() => handleShowActions(null, transactions, setTransactions)}
      >
        <div className="container">
          <h1 className="page-title">Transaction</h1>
          <div className="transaction__table">
            <div className="transaction__table-container">
              <div className="dashboard__table-actions">
                <TableActions
                  filterForm={filterForm}
                  setFilterForm={setFilterForm}
                  showModal={() => setShow(true)}
                  searchHandler={customerSearchHandler}
                >
                  <Button
                    onclick={() => setAdd(true)}
                    svg={addSvg}
                    bgColor={"button-blue"}
                  >
                    Add Transaction
                  </Button>
                </TableActions>
              </div>
              <Table
                onclick={() => setShow(true)}
                data={slicedArr}
                actions={showActions}
                showActions={showActionsHandler}
                showDelete={showDeleteAlert}
                showTransaction={showCustomerTransaction}
                showEditForm={() => {}}
                page="transaction"
              />
            </div>
          </div>
          <Pagination
            length={transactions.length}
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

export default Transaction;
