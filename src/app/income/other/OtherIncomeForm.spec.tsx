/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeForm} from './OtherIncomeForm';

function setup(propOverrides: any) {
  const props = Object.assign({
    onChange: jasmine.createSpy('onChange'),
    onSubmit: jasmine.createSpy('onSubmit'),
    squareFeet: 420,
    monthlyRent: 503,
    css: {
      newIncomeContainerName: 'new-other-income',
      usageInputName: 'other-residential-use usage',
      squareFeetInputName: 'other-residential-square-feet',
      monthlyRentInputName: 'other-residential-monthly-rent'
    },
    usage: 'kart'
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<OtherIncomeForm {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('OtherIncomeForm', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('form');
    expect(output.props.id).toBe(props.css.newIncomeContainerName);
    const [usage, squareFeet, rent, submitInput] = output.props.children;

    expect(usage.type).toBe('label');
    const [usageLabelText, usageInput] = usage.props.children;
    expect(usageLabelText).toBe('usage');
    expect(usageInput.type).toBe('input');
    expect(usageInput.props.className).toBe(props.css.usageInputName);
    expect(usageInput.props.name).toBe('usage');

    expect(squareFeet.type).toBe('label');
    const [squareFeetLabelText, squareFeetInput] = squareFeet.props.children;
    expect(squareFeetLabelText).toBe('square feet');
    expect(squareFeetInput.type).toBe('input');
    expect(squareFeetInput.props.className).toBe(props.css.squareFeetInputName);
    expect(squareFeetInput.props.name).toBe('squareFeet');

    expect(rent.type).toBe('label');
    const [monthlyRentLabelText, apartmentMonthlyRentInput] = rent.props.children;
    expect(monthlyRentLabelText).toBe('monthly rent');
    expect(apartmentMonthlyRentInput.type).toBe('input');
    expect(apartmentMonthlyRentInput.props.className).toBe(props.css.monthlyRentInputName);
    expect(apartmentMonthlyRentInput.props.name).toBe('monthlyRent');

    expect(submitInput.type).toBe('input');
    expect(submitInput.props.type).toBe('submit');
  });
  it('should have expected initial field values', () => {
    const expectedFieldVals = ['blah', 450, 432];
    const nullFieldValues = {
      usage: expectedFieldVals[0],
      squareFeet: expectedFieldVals[1],
      monthlyRent: expectedFieldVals[2]
    };
    const {output} = setup(nullFieldValues);
    const [usage, squareFeet, monthlyRent] = output.props.children;
    [usage, squareFeet, monthlyRent].forEach((field, idx) => {
      expect(field.props.children[1].props.value).toBe(expectedFieldVals[idx]);
    });
  });
  it('should call onChange for input onChange', () => {
    const {output, props} = setup({});
    for (let i = 0; i < 3; i++){
      props.onChange.calls.reset();
      let input = output.props.children[i].props.children[1];
      input.props.onChange({target: {}});
      expect(props.onChange).toHaveBeenCalled();
    }
  });
  it('should call onSubmit for form submit', () => {
    const {props, output} = setup({});
    const {onSubmit} = output.props;
    expect(props.onSubmit.calls.count()).toBe(0);
    onSubmit({preventDefault: () => {}});
    expect(props.onSubmit.calls.count()).toBe(1);
  });
});
