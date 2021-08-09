// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import LoaderContext from "../loaderContext";

import Button from "./../components/UI/button";
import Input from "./../components/UI/input";
import AddForm from "./../components/addform";

import { inputChangeHandler } from "../helpers/changeHandler";
import { emailValidation, password } from "../helpers/validation";

import edit from "../assets/edit-2.svg";
import remove from "../assets/delete-2.svg";
import add from "../assets/add.svg";

const SystemUser = () => {
  // Component States
  const [addForm, setAddForm] = useState({
    name: {
      label: "Name",
      placeholder: "John Doe",
      value: "",
      elementType: "input",
      type: "text",
      isValid: false,
      validations: [],
    },
    email: {
      label: "Email Address",
      placeholder: "Email Address",
      elementType: "input",
      type: "email",
      value: "",
      isValid: false,
      validations: [emailValidation],
    },
    password: {
      label: "Password",
      placeholder: "*******",
      value: "",
      elementType: "input",
      type: "password",
      isValid: false,
      validations: [password],
      readonly: false,
    },
  });

  const [formValid, setFormValid] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const { setIsLoading } = useContext(LoaderContext);
  const [selectedID, setSelectedID] = useState();

  // GET USER
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // GET USER
  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get("/api/v1/users/");
    setIsLoading(false);
    setUsers(res.data.data.users);
  };
  // ADD USER

  const addUser = () => {
    setTitle("Add");
    setShowForm(true);
    setAddForm((prevState) => {
      return {
        ...prevState,
        name: {
          ...prevState.name,
          value: "",
          isValid: false,
        },
        email: {
          ...prevState.email,
          value: "",
          isValid: false,
        },
        password: {
          ...prevState.password,
          readonly: false,
          isValid: false,
        },
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!formValid) {
      return;
    } else {
      setIsLoading(true);
      const form = {};
      for (let key in addForm) {
        form[key] = addForm[key].value;
      }
      try {
        await axios.post("/api/v1/users", form);
        fetchData();
        setShowForm(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMsg("Email already exists");
      }
    }
  };

  // EDIT USER

  const editUser = (id) => {
    setTitle("Edit User");
    setShowForm(true);
    setSelectedID(id);
    setFormValid(true);
    const selectedUser = users.find((item) => item._id === id);
    setAddForm((prevState) => {
      return {
        ...prevState,
        email: {
          ...prevState.email,
          value: selectedUser.email,
          isValid: true,
        },
        name: {
          ...prevState.name,
          isValid: true,
          value: selectedUser.name,
        },
      };
    });
  };

  const handleSubmitEdit = async (evt) => {
    evt.preventDefault();
    if (!formValid) {
      evt.preventDefault();
      return;
    }
    try {
      setIsLoading(true);
      const values = {};
      for (let key in addForm) {
        values[key] = addForm[key].value;
      }
      await axios.put(`/api/v1/users/${selectedID}`, values);
      setIsLoading(false);
      setShowForm(false);
      fetchData();
    } catch (error) {}
  };

  // DELETE USER

  const showDeleteBox = (id) => {
    const answer = window.confirm("Are you sure you want to delete");
    setSelectedID(id);
    if (answer) {
      deleteHandler(id);
    }
  };

  const deleteHandler = async (id) => {
    setIsLoading(true);
    await axios.delete(`api/v1/users/${id}`);
    setIsLoading(false);
    fetchData();
  };
  // Form Generaion
  const formArr = [];
  for (let key in addForm) {
    formArr.push({
      id: key,
      config: addForm[key],
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
        inputChangeHandler(evt, id, addForm, setAddForm, setFormValid)
      }
    />
  ));

  return (
    <>
      {showForm && (
        <AddForm
          title={title}
          onclick={() => setShowForm(false)}
          form={form}
          submitForm={title === "Add" ? handleSubmit : handleSubmitEdit}
          error={errorMsg}
          userId={selectedID}
        />
      )}
      <section className="users">
        <div className="container">
          <h1 className="page-title">System Users</h1>
          <div className="users__table">
            <div className="users__button">
              <Button onclick={addUser} svg={add} bgColor={"button-blue"}>
                ADD USER
              </Button>
            </div>
            <table className="table">
              <thead style={{ textAlign: "left" }}>
                <tr className="table__head">
                  <td>Name </td>
                  <td>Email</td>
                  <td>Role</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="users__actions">
                      <Button
                        type="button"
                        onclick={() => editUser(user._id)}
                        svg={edit}
                        bgColor={"button-blue"}
                      >
                        Edit
                      </Button>
                      <Button
                        onclick={() => showDeleteBox(user._id)}
                        svg={remove}
                        bgColor={"button-grey-2"}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
export default SystemUser;
