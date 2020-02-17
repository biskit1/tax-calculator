import React from "react";
import "./App.css";

function SalaryInput({ salary, onChangeSalary, onSubmitSalary }) {
  return (
    <div className="col-12">
      <form onSubmit={onSubmitSalary}>
        <div className="form-group">
          <label>Enter Gross Annual Income (CAD): </label>
          <input
            className="form-control col-xs-12 col-sm-8 col-md-6"
            value={salary}
            onChange={onChangeSalary}
            type="number"
            min="0"
            placeholder="$"
            title="please enter number only"
            required
          ></input>
          <input
            type="submit"
            className="btn btn-primary mt-4"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}

export default SalaryInput;
