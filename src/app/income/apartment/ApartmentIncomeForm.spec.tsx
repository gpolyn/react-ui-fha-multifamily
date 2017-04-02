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
    expect(output.type).toBe('tr');
    expect(output.props.id).toBe('new-apartment-income');
    // const form = output.props.children;
    // expect(form.type).toBe('form');
    const [brContainer, unitsContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;

    [brContainer, unitsContainer, sqFTContainer, rentContainer, addContainer].forEach( container => expect(container.type).toBe('td'));

    const bedroomCount = brContainer.props.children;
    expect(bedroomCount.type).toBe('select');
    expect(bedroomCount.props.className).toBe('apartment-bedroom-count');
    for (let i = 0; i < 5; i++){
      expect(bedroomCount.props.children[i].type).toBe('option');
      expect(bedroomCount.props.children[i].props.value).toBe(i);
      expect(bedroomCount.props.children[i].props.children).toBe(i);
    }

    const unitsInput = unitsContainer.props.children;
    expect(unitsInput.type).toBe('input');
    expect(unitsInput.props.className).toBe('apartment-unit-count');
    expect(unitsInput.props.name).toBe('units');

    const sqFtInput = sqFTContainer.props.children;
    expect(sqFtInput.type).toBe('input');
    expect(sqFtInput.props.className).toBe('apartment-square-feet');
    expect(sqFtInput.props.name).toBe('squareFeet');

    const rentInput = rentContainer.props.children;
    expect(rentInput.type).toBe('input');
    expect(rentInput.props.className).toBe('apartment-monthly-rent');
    expect(rentInput.props.name).toBe('monthlyRent');

    const submitInput = addContainer.props.children;
    expect(submitInput.type).toBe('div');
    expect(submitInput.props.className).toBe('add');
    const [formInput] = submitInput.props.children;
    expect(submitInput.props.children.type).toBe('button');
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
    const [brContainer, unitsContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;
    const bedroomCount = brContainer.props.children;
    const units = unitsContainer.props.children;
    const sqFt = sqFTContainer.props.children;
    const rent = rentContainer.props.children;
    expect(units.props.value).toBe(nullFieldValues.units);
    expect(bedroomCount.props.value).toBe(nullFieldValues.bedroomCount);
    expect(sqFt.props.value).toBe(nullFieldValues.squareFeet);
    expect(rent.props.value).toBe(nullFieldValues.monthlyRent);
  });
  it('should call onChange for input onChange', () => {
    const {output, props} = setup({});
    for (let i = 0; i < 4; i++){
      props.onChange.calls.reset();
      expect(output.props.children[i].props.children.props.onChange({target: {}}))
      expect(props.onChange).toHaveBeenCalled();
    }
  });
  it('should call onSubmit for button#add-item click', () => {
    const {props, output} = setup({});
    const addContainer = output.props.children[4];
    const {onClick} = addContainer.props.children.props.children.props;
    expect(props.onSubmit.calls.count()).toBe(0);
    onClick();
    expect(props.onSubmit.calls.count()).toBe(1);
  });
});
