import React from "react";
import { mount } from "enzyme";

import App from "./App";
import TaxCalculator from "./TaxCalculator";

describe("App", () => {
  let component;

  const mountComponent = () => {
    component = mount(<App />);
  };

  it("should render a <div />", () => {
    mountComponent();
    expect(component.find(TaxCalculator).length).toEqual(1);
  });
});
