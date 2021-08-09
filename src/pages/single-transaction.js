import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoaderContext from "../loaderContext";

import AddForm from "./../components/addform";
import Input from "../components/UI/input";

import formatter from "../helpers/dateformatter";
import { inputChangeHandler } from "../helpers/changeHandler";

import back from "../assets/back.svg";
import cancel from "../assets/cancel.svg";
import edit from "../assets/edit.svg";
import remove from "../assets/delete.svg";

const SingleTransaction = ({ close, id }) => {
  const { setIsLoading } = useContext(LoaderContext);
  const [transaction, setTransaction] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [formValid, setFormValid] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [showForm, setShowForm] = useState(false);

  const [editForm, setEditForm] = useState({
    item: {
      label: "Item",
      placeholder: "Nose Ring",
      value: "",
      elementType: "input",
      type: "text",
      isValid: false,
      validations: [],
    },
    price: {
      label: "Price",
      value: "",
      elementType: "input",
      type: "number",
      placeholder: "Enter Price",
      validations: [],
      isValid: false,
    },
  });

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/v1/customers/${id}/transactions`);
      setTransaction(res.data.body.transactions);
      setIsLoading(false);
      const totalAmount = res.data.body.transactions.reduce(
        (acc, value) => +acc + +value.price,
        0
      );
      setTotalAmount(totalAmount);
    } catch (err) {
      setIsLoading(false);
    }
  };

  // EDIT TRANSACTION

  const showEditHandler = (id) => {
    setSelectedID(id);
    const { item, price } = transaction.find((item) => item._id === id);
    setEditForm((prevState) => {
      return {
        ...prevState,
        item: {
          ...prevState.item,
          value: item,
          isValid: true,
        },
        price: {
          ...prevState.price,
          isValid: true,
          value: price,
        },
      };
    });
    setShowForm(true);
    setFormValid(true);
  };

  const editSubmitHandler = async (evt) => {
    evt.preventDefault();
    if (!formValid) {
      evt.preventDefault();
      return;
    }

    try {
      setIsLoading(true);
      const values = {};
      for (let key in editForm) {
        values[key] = editForm[key].value;
      }
      await axios.put(`/api/v1/transactions/${selectedID}`, values);
      setIsLoading(false);
      setShowForm(false);
      fetchData();
    } catch (error) {
      setIsLoading(false);
    }
  };

  // DELETE TRANSACTION

  const deleteSubmitHandler = async (id) => {
    const request = window.confirm(
      "Are you sure you want to delete this transaction"
    );
    if (request) {
      setIsLoading(true);
      await axios.delete(`api/v1/transactions/${id}`);
      setIsLoading(false);
      fetchData();
    }
  };

  // FORM GENERATION

  const formArr = [];
  for (let key in editForm) {
    formArr.push({ id: key, config: editForm[key] });
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
        inputChangeHandler(evt, id, editForm, setEditForm, setFormValid)
      }
      readonly={config.readonly}
      msg={config.msg}
    />
  ));

  return (
    <>
      {showForm && (
        <AddForm
          title={"Edit Transaction"}
          onclick={() => setShowForm(false)}
          form={form}
          submitForm={editSubmitHandler}
        />
      )}
      <div className="single">
        <div className="single__box  animate__animated animate__slideInRight">
          <div className="single__container ">
            <div className="single__head">
              <img alt="back" src={back} />
              <h1>Purchase History</h1>
              <img src={cancel} alt="cancel" onClick={close} />
            </div>
            <div className="single__details">
              <div className="single__total">
                <p>Total Purchase</p>
                <p>${totalAmount}</p>
              </div>
              <table className="table">
                <thead style={{ textAlign: "left" }}>
                  <tr className="table__head">
                    <td>Date</td>
                    <td>Item</td>
                    <td>Amount</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {transaction.map((item) => {
                    const { date } = formatter(item.createdAt);

                    return (
                      <tr key={item._id}>
                        <td>{date}</td>
                        <td>{item.item}</td>
                        <td>{item.price}</td>
                        <td className="single__actions">
                          <img
                            src={edit}
                            alt="edit"
                            onClick={() => showEditHandler(item._id)}
                          />
                          <img
                            src={remove}
                            alt="edit"
                            onClick={() => deleteSubmitHandler(item._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTransaction;
