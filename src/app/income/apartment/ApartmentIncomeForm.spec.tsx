/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ApartmentIncomeForm} from './ApartmentIncomeForm';

function setup(propOverrides: any) {
  const props = Object.assign({
    onChange: jasmine.createSpy('onChange'),
    onSubmit: jasmine.createSpy('onSubmit'),
    squareFeet: 420,
    bedroomCount: 3,
    units: 45,
    monthlyRent: 503,
    css: {
      newIncomeContainerName: 'new-apartment-income',
    },
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<ApartmentIncomeForm {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ApartmentIncomeForm', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('form');
    expect(output.props.id).toBe(props.newIncomeContainerName);
    const [bedroomCount, units, sqFt, rent, submitInput] = output.props.children;

    expect(bedroomCount.type).toBe('label');
    const [brCountLabelText, bedroomCountInput] = bedroomCount.props.children;
    expect(brCountLabelText).toBe('bedrooms');
    expect(bedroomCountInput.type).toBe('select');
    expect(bedroomCountInput.props.className).toBe('apartment-bedroom-count');
    for (let i = 0; i < 5; i++){
      expect(bedroomCountInput.props.children[i].type).toBe('option');
      expect(bedroomCountInput.props.children[i].props.value).toBe(i);
      expect(bedroomCountInput.props.children[i].props.children).toBe(i);
    }

    expect(units.type).toBe('label');
    const [unitsLabelText, unitsInput] = units.props.children;
    expect(unitsLabelText).toBe('units');
    expect(unitsInput.type).toBe('input');
    expect(unitsInput.props.className).toBe('apartment-unit-count');
    expect(unitsInput.props.name).toBe('units');

    expect(sqFt.type).toBe('label');
    const [sqFtLabeltext, sqFtInput] = sqFt.props.children;
    expect(sqFtLabeltext).toBe('square feet');
    expect(sqFtInput.type).toBe('input');
    expect(sqFtInput.props.className).toBe('apartment-square-feet');
    expect(sqFtInput.props.name).toBe('squareFeet');

    expect(rent.type).toBe('label');
    const [rentLabelText, rentInput] = rent.props.children;
    expect(rentLabelText).toBe('monthly rent');
    expect(rentInput.type).toBe('input');
    expect(rentInput.props.className).toBe('apartment-monthly-rent');
    expect(rentInput.props.name).toBe('monthlyRent');

    expect(submitInput.type).toBe('div');
    expect(submitInput.props.className).toBe('add');
    const [formInput] = submitInput.props.children;
    expect(submitInput.props.children.type).toBe('input');
    const expectedClassNames = 'add-apartment-income add-item';
    expect(submitInput.props.children.props.className).toBe(expectedClassNames);
  });
  it('should have expected initial field values', () => {
    const nullFieldValues = {
      units: 23,
      bedroomCount: 3,
      squareFeet: 678,
      monthlyRent: 2130
    };
    const {output} = setup(nullFieldValues);
    const [bedroomCount, units, sqFt, rent] = output.props.children;
    expect(units.props.children[1].props.value).toBe(nullFieldValues.units);
    expect(bedroomCount.props.children[1].props.value).toBe(nullFieldValues.bedroomCount);
    expect(sqFt.props.children[1].props.value).toBe(nullFieldValues.squareFeet);
    expect(rent.props.children[1].props.value).toBe(nullFieldValues.monthlyRent);
  });
  it('should call onChange for input onChange', () => {
    const {output, props} = setup({});
    for (let i = 0; i < 4; i++){
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
