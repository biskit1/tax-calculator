import React from "react";
import { mount } from "enzyme";

import SalaryInput from "./SalaryInput";

describe("SalaryInput tests", () => {
  let props;
  let component;
  let onChangeSalary;
  let onSubmitSalary;

  const mountComponent = () => {
    component = mount(<SalaryInput {...props} />);
  };

  beforeEach(() => {
    onChangeSalary = jest.fn();
    onSubmitSalary = jest.fn();
    props = {
      onChangeSalary,
      onSubmitSalary
    };
  });

  it("displays the component properly", () => {
    mountComponent();
    const form = component.find("form");
    expect(form.length).toBe(1);

    const input = component.find("input");
    expect(input.length).toBe(2);
    expect(input.first().props().type).toBe("number");
  });

  it("change and submit functions are called on change and submit", () => {
    mountComponent();
    const input = component.find('input[type="number"]');
    expect(input.length).toBe(1);
    input.simulate("change", { target: { value: 60000 } });
    expect(onChangeSalary).toHaveBeenCalled();

    const form = component.find("form");
    form.simulate("submit");
    expect(onSubmitSalary).toHaveBeenCalled();
  });
});
