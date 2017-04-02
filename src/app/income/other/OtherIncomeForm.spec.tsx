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
    expect(output.type).toBe('tr');
    expect(output.props.id).toBe(props.css.newIncomeContainerName);
    const [usageContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;
    [usageContainer, sqFTContainer, rentContainer, addContainer].forEach( container => {
      expect(container.type).toBe('td');
    });

    const usageInput = usageContainer.props.children;
    expect(usageInput.type).toBe('input');
    expect(usageInput.props.className).toBe(props.css.usageInputName);
    expect(usageInput.props.name).toBe('usage');

    const squareFeetInput = sqFTContainer.props.children;
    expect(squareFeetInput.type).toBe('input');
    expect(squareFeetInput.props.className).toBe(props.css.squareFeetInputName);
    expect(squareFeetInput.props.name).toBe('squareFeet');

    const apartmentMonthlyRentInput = rentContainer.props.children;
    expect(apartmentMonthlyRentInput.type).toBe('input');
    expect(apartmentMonthlyRentInput.props.className).toBe(props.css.monthlyRentInputName);
    expect(apartmentMonthlyRentInput.props.name).toBe('monthlyRent');

    const innerDiv = addContainer.props.children;
    expect(innerDiv.type).toBe('div');
    const submitInput = innerDiv.props.children;
    expect(submitInput.type).toBe('button');
  });
  it('should have expected initial field values', () => {
    const expectedFieldVals = ['blah', 450, 432];
    const nullFieldValues = {
      usage: expectedFieldVals[0],
      squareFeet: expectedFieldVals[1],
      monthlyRent: expectedFieldVals[2]
    };
    const {output} = setup(nullFieldValues);
    const [usageContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;
    const usage = usageContainer.props.children;
    const squareFeet = sqFTContainer.props.children;
    const monthlyRent = rentContainer.props.children;
    [usage, squareFeet, monthlyRent].forEach((field, idx) => {
      expect(field.props.value).toBe(expectedFieldVals[idx]);
    });
  });
  it('should call onChange for input onChange', () => {
    const {output, props} = setup({});
    const altProps = props;
    for (let i = 0; i < 3; i++){
      altProps.onChange.calls.reset();
      let input = output.props.children[i].props.children,props;
      input.props.onChange({target: {}});
      expect(altProps.onChange).toHaveBeenCalled();
    }
  });
  it('should call onSubmit for button#add-item click', () => {
    const {props, output} = setup({});
    const addContainer = output.props.children[3];
    const {onClick} = addContainer.props.children.props.children.props;
    expect(props.onSubmit.calls.count()).toBe(0);
    onClick();
    expect(props.onSubmit.calls.count()).toBe(1);
  });
});
