import React from "react";
import "./App.css";
import "./TaxBreakdownView.css";
import {
  formatValueToDollars,
  formatValueToPercent,
  getBrackets,
  getPercentages
} from "./utils";

function TaxBreakdownView({ salary, onBack }) {
  const taxBrackets = [
    { range: "Under $47,630", percent: "15%" },
    { range: "$47,631 to $95,259", percent: "20.5%" },
    { range: "$95,260 to $147,667", percent: "26%" },
    { range: "$147,667 to $210,371", percent: "29%" },
    { range: "Over 210,371", percent: "33%" }
  ];

  const calculateTax = salary => {
    const taxes = {
      endingBracket: 0,
      totalTaxes: 0,
      bracketRate: [0, 0, 0, 0, 0]
    };

    const bracket = getBrackets();
    const taxRate = getPercentages();

    for (var i = 0; i < 5; i++) {
      if (salary > bracket[i + 1]) {
        taxes.bracketRate[i] = (bracket[i + 1] - bracket[i]) * taxRate[i + 1];
        taxes.totalTaxes = taxes.totalTaxes + taxes.bracketRate[i];
      } else {
        taxes.bracketRate[i] = (salary - bracket[i]) * taxRate[i + 1];
        taxes.totalTaxes = taxes.totalTaxes + taxes.bracketRate[i];
        taxes.endingBracket = i + 1;
        i = 5;
      }
    }
    return taxes;
  };

  const taxes = calculateTax(salary);

  const rowItems = taxBrackets.map((obj, index) => (
    <tr
      key={obj.range}
      className={
        taxes.bracketRate[index] !== 0
          ? "active-bracket font-weight-bold"
          : undefined
      }
    >
      <td className="federal" data-label="Federal tax brackets">
        {obj.range}
      </td>
      <td className="federal" data-label="Federal tax rates">
        {obj.percent}
      </td>
      <td>{formatValueToDollars(taxes.bracketRate[index])}</td>
    </tr>
  ));

  return (
    <div className="col-12">
      {/* <h2>Breakdown</h2> */}
      <p>Your taxable income places you in the following tax brackets:</p>
      <div className="table-responsive">
        <table className="table mb-4">
          <thead>
            <tr>
              <th className="federal" data-label="Federal tax bracket">
                Federal tax bracket
              </th>
              <th className="federal" data-label="Federal tax rates">
                Federal tax rates
              </th>
              <th className="federal" data-label="Federal tax rates">
                Tax charged
              </th>
            </tr>
          </thead>
          <tbody>
            {rowItems}
            <tr className="border-top-3">
              <td colSpan="2">Annual gross income: </td>
              <td className="font-weight-bold">
                {formatValueToDollars(salary)}
              </td>
            </tr>
            <tr className="table-borderless">
              <td colSpan="2">Total tax paid: </td>
              <td className="font-weight-bold" id="total-taxes">
                {formatValueToDollars(taxes.totalTaxes)}
              </td>
            </tr>
            <tr className="table-borderless">
              <td colSpan="2">Income after federal tax: </td>
              <td className="font-weight-bold">
                {formatValueToDollars(salary - taxes.totalTaxes)}
              </td>
            </tr>
            <tr className="table-borderless">
              <td colSpan="2">Marginal tax rate (tax bracket): </td>
              <td className="font-weight-bold">
                {taxBrackets[taxes.endingBracket - 1].percent}
              </td>
            </tr>
            <tr className="table-borderless">
              <td colSpan="2">Effective tax rate: </td>
              <td className="font-weight-bold">
                {formatValueToPercent((taxes.totalTaxes / salary) * 100)}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>*Provincial rates may still apply</small>
        </p>
        <button className="mt-4 col-5 btn btn-primary" onClick={onBack}>
          Start over
        </button>
      </div>
    </div>
  );
}

export default TaxBreakdownView;
