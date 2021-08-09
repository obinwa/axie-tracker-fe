// @ts-nocheck
import action from "../assets/action.svg";
import formatter from "../helpers/dateformatter";
import Actions from "./actions";
import axios from "axios";

const Table =  ({
  onclick,
  data,
  actions,
  showActions,
  showDelete,
  component,
  showTransaction,
  showEditForm,
  page,
}) => {

  return (
    <table className="table" style={{ overflow: "auto" }}>
      <thead style={{ textAlign: "left" }}>
        <tr className="table__head">
          <th>Name</th>
          <th>Average</th>
          <th>Claimed</th>
          <th>Last Claimed</th>
          <th>Claim On</th>
          <th>Manager Slp</th>
          <th>Scholar Slp</th>
          <th>Today Slp</th>
          <th>Elo</th>
          {page === "transaction" ? <th>Created At</th> : <th>Membership</th>}
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((item,id) => {

          return (
            <tr key={id} onClick={(evt) => showTransaction(evt, id)}>
              <td>{item.name}</td>
              <td>{item.average}</td>
              <td>{item.claimed}</td>
              <td>{item.lastClaim}</td>
              <td>{item.claimOn}</td>
              <td>{item.managerSlp}</td>
              <td>{item.scholarSlp}</td>
              <td>{item.todaySlp}</td>
              <td>{item.elo}</td>


              <td>
                <img
                  className="table__img"
                  src={action}
                  alt="click"
                  onClick={(evt) => showActions(evt, item._id)}
                />
                {item.open && (
                  <Actions
                    editHandler={(evt) => showEditForm(evt, item._id)}
                    deleteHandler={(evt) => showDelete(evt, item._id)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
