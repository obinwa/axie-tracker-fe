// @ts-nocheck
import { useState } from "react";

import Input from "./UI/input";
import Button from "./UI/button";

import { inputChangeHandler } from "./../helpers/changeHandler";

import filter from "../assets/filter.svg";


const TableActions = ({
  filterForm,
  children,
  setFilterForm,
  // valid,
  searchHandler,
}) => {
  const [value, setFormValid] = useState(false);

  let formArr = [];
  for (let key in filterForm) {
    formArr.push({
      id: key,
      config: filterForm[key],
    });
  }
  const form = formArr.map(({ id, config }) => (
    <Input
      c={value}
      key={id}
      elementType={config.elementType}
      value={config.value}
      options={config.options}
      placeholder={config.placeholder}
      label={config.label}
      onchange={(evt) =>
        inputChangeHandler(evt, id, filterForm, setFilterForm, setFormValid)
      }
    />
  ));
  return (
    <div className="table__actions-container">
      <form className="table__actions-form" onSubmit={searchHandler}>
        {form}
        <Button type="submit"  bgColor={"button-grey"}>
          Update Scholars
        </Button>
      </form>
      {children}
    </div>
  );
};

export default TableActions;
