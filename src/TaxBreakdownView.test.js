import React from "react";
import { mount } from "enzyme";

import TaxBreakdownView from "./TaxBreakdownView";

describe("TaxBreakdownView tests", () => {
  let props;
  let component;
  let onBack;

  const mountComponent = () => {
    component = mount(<TaxBreakdownView {...props} />);
  };

  beforeEach(() => {
    onBack = jest.fn();
    props = {
      onBack
      // salary: 98000
    };
  });

  it("displays the component properly", () => {
    mountComponent();
    const table = component.find("table");
    expect(table.length).toBe(1);
  });

  it("onback function gets calls when button clicked", () => {
    mountComponent();
    const backbutton = component.find("button");
    expect(backbutton.length).toBe(1);
    backbutton.simulate("click");
    expect(onBack).toHaveBeenCalled();
  });

  it("correctly calculates tax for value below first bracket", () => {
    props = { ...props, salary: 13000 };
    mountComponent();
    const totaltaxes = component.find("#total-taxes");
    expect(totaltaxes.text()).toBe("$1,950");
  });

  it("correctly calculates tax for value above last bracket", () => {
    props = { ...props, salary: 321000 };
    mountComponent();
    const totaltaxes = component.find("#total-taxes");
    expect(totaltaxes.text()).toBe("$85,226");
  });
});
