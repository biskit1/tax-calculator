import React from "react";
import { mount } from "enzyme";

import TaxCalculator from "./TaxCalculator";

describe("TaxCalculator tests", () => {
  let component;

  const mountComponent = () => {
    component = mount(<TaxCalculator />);
  };

  it("displays the component properly", () => {
    mountComponent();
    const wrapper = component.find("div.wrapper");
    expect(wrapper.length).toBe(1);
  });
});
