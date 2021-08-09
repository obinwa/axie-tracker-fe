// @ts-nocheck
import Modal from "./UI/modal";
import Button from "./UI/button";

import cancel from "../assets/cancel.svg";

const AddForm = ({ onclick, form, title, submitForm, error }) => {
  return (
    <Modal>
      <div className="add">
        <div className="add__container">
          <div className="add__header">
            <h1 className="value">{title}</h1>
            <img onClick={onclick} src={cancel} alt="go back" />
          </div>
          <form className="form" onSubmit={submitForm}>
            {error !== "" && <p className="error">{error}</p>}
            {form}
            <div className="add__buttons">
              <Button type="button" onclick={onclick} bgColor="button-grey">
                Cancel
              </Button>
              <Button type="submit" bgColor="button-blue">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddForm;
