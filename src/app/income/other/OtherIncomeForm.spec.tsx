/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeForm} from './OtherIncomeForm';

const initialSquareFeet = 420;
const initialMonthlyRent = 503;
const initialUsage = 'fart';
const containerCSSId = 'new-other-income';

function setup(propOverrides: any) {
  const props = Object.assign({
    onChange: jasmine.createSpy('onChange'),
    onSubmit: jasmine.createSpy('onSubmit'),
    squareFeet: initialSquareFeet,
    monthlyRent: initialMonthlyRent,
    containerCSSId: containerCSSId,
    usage: initialUsage
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
    const {output} = setup({});
    expect(output.type).toBe('form');
    expect(output.props.id).toBe(containerCSSId);
    const [usage, squareFeet, rent] = output.props.children;

    expect(usage.type).toBe('label');
    const [usageLabelText, usageInput] = usage.props.children;
    expect(usageLabelText).toBe('usage');
    expect(usageInput.type).toBe('input');
    expect(usageInput.props.className).toBe('usage');
    expect(usageInput.props.name).toBe('usage');

    expect(squareFeet.type).toBe('label');
    const [squareFeetLabelText, squareFeetInput] = squareFeet.props.children;
    expect(squareFeetLabelText).toBe('square feet');
    expect(squareFeetInput.type).toBe('input');
    expect(squareFeetInput.props.className).toBe('apartment-square-feet');
    expect(squareFeetInput.props.name).toBe('squareFeet');

    expect(rent.type).toBe('label');
    const [monthlyRentLabelText, apartmentMonthlyRentInput] = rent.props.children;
    expect(monthlyRentLabelText).toBe('monthly rent');
    expect(apartmentMonthlyRentInput.type).toBe('input');
    expect(apartmentMonthlyRentInput.props.className).toBe('apartment-monthly-rent');
    expect(apartmentMonthlyRentInput.props.name).toBe('monthlyRent');
  });
  it('should have expected initial field values', () => {
    const nullFieldValues = {
      usage: 'blah',
      squareFeet: 450,
      monthlyRent: 432,
    };
    const {output} = setup(nullFieldValues);
    const [usage, squareFeet, monthlyRent] = output.props.children;
    const expectedFieldVals = ['blah', 450, 432];
    [usage, squareFeet, monthlyRent].forEach((field, idx) => {
      expect(field.props.children[1].props.value).toBe(expectedFieldVals[idx]);
    });
  });
  it('should call onChange for usage input onChange', () => {
    const {output, props} = setup({});
    const [usage] = output.props.children;
    const [, input] = usage.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for squareFeet input onChange', () => {
    const {output, props} = setup({});
    const [, squareFeet] = output.props.children;
    const [, input] = squareFeet.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for monthlyRent input onChange', () => {
    const {output, props} = setup({});
    const [, , monthlyRent] = output.props.children;
    const [, input] = monthlyRent.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onSubmit for form submit', () => {
    const {props, output} = setup({});
    const {onSubmit} = output.props;
    expect(props.onSubmit.calls.count()).toBe(0);
    onSubmit({preventDefault: () => {}});
    expect(props.onSubmit.calls.count()).toBe(1);
  });
});
