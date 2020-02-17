import React, { useState } from "react";
import "./App.css";
import SalaryInput from "./SalaryInput";
import TaxBreakdownView from "./TaxBreakdownView";

function TaxCalculator() {
  const [salary, setSalary] = useState("");
  const [calculateTaxes, setCalculateTaxes] = useState(false);

  const handleChange = e => {
    setSalary(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCalculateTaxes(true);
  };

  const handleBack = () => {
    setCalculateTaxes(false);
    setSalary("");
  };

  let view = calculateTaxes ? (
    <TaxBreakdownView salary={salary} onBack={handleBack} />
  ) : (
    <SalaryInput
      salary={salary}
      onChangeSalary={handleChange}
      onSubmitSalary={handleSubmit}
    />
  );

  return (
    <div className="wrapper">
      <h1 className="col-12 mb-3 pb-1">
        Canadian Federal Income Tax Calculator
      </h1>
      {view}
    </div>
  );
}

export default TaxCalculator;
