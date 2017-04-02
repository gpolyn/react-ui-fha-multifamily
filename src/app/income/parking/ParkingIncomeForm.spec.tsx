/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ParkingIncomeForm} from './ParkingIncomeForm';

function setup(propOverrides: any) {
  const props = Object.assign({
    onChange: jasmine.createSpy('onChange'),
    onSubmit: jasmine.createSpy('onSubmit'),
    totalSquareFeet: 420,
    isIndoor: true,
    spaces: 45,
    monthlyFee: 503,
    css: {
      newIncomeContainerName: 'parking-income',
      spacesInputName: 'parking usage',
      indoorOrOutdoorInputName: 'whatevs',
      squareFeetInputName: 'parking-sf',
      monthlyFeeInputName: 'parking-fee'
    },
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(<ParkingIncomeForm {...props}/>);

  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ParkingIncomeForm', () => {
  it('initial render', () => {
    const {output, props} = setup({});
    expect(output.type).toBe('tr');
    expect(output.props.id).toBe(props.css.newIncomeContainerName);
    const [spacesContainer, typeContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;

    const indoorOutdoor = typeContainer.props.children;
    expect(indoorOutdoor.type).toBe('select');
    const [option1, option2] = indoorOutdoor.props.children;
    expect(option1.type).toBe('option');
    expect(option1.props.children).toBe('indoor');
    expect(option2.type).toBe('option');
    expect(option2.props.children).toBe('outdoor');

    const spacesInput = spacesContainer.props.children;
    expect(spacesInput.type).toBe('input');
    expect(spacesInput.props.className).toBe(props.css.spacesInputName);
    expect(spacesInput.props.name).toBe('spaces');

    const sqFtInput = sqFTContainer.props.children;
    expect(sqFtInput.type).toBe('input');
    expect(sqFtInput.props.className).toBe(props.css.squareFeetInputName);
    expect(sqFtInput.props.name).toBe('totalSquareFeet');

    const feeInput = rentContainer.props.children;
    expect(feeInput.type).toBe('input');
    expect(feeInput.props.className).toBe(props.css.monthlyFeeInputName);
    expect(feeInput.props.name).toBe('monthlyFee');

    const innerDiv = addContainer.props.children;
    expect(innerDiv.type).toBe('div');
    const submitInput = innerDiv.props.children;
    expect(submitInput.type).toBe('button');
  });
  it('should have expected initial field values', () => {
    const expectedFieldVals = [45, true, 450, 432];
    const nullFieldValues = {
      spaces: expectedFieldVals[0],
      isIndoor: expectedFieldVals[1],
      totalSquareFeet: expectedFieldVals[2],
      monthlyFee: expectedFieldVals[3]
    };
    const {output} = setup(nullFieldValues);
    const [spacesContainer, typeContainer, sqFTContainer, rentContainer, addContainer] = output.props.children;
    const spaces = spacesContainer.props.children;
    const indoorOrOutdoor = typeContainer.props.children;
    const sqFt = sqFTContainer.props.children;
    const fee = rentContainer.props.children;
    expect(spaces.props.value).toBe(expectedFieldVals[0]);
    expect(indoorOrOutdoor.props.value).toBe(expectedFieldVals[1]);
    expect(sqFt.props.value).toBe(expectedFieldVals[2]);
    expect(fee.props.value).toBe(expectedFieldVals[3]);
  });
  it('should call onChange for spaces input onChange', () => {
    const {output, props} = setup({});
    const spacesContainer = output.props.children[0];
    const input = spacesContainer.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for indoor/outdoor selector onChange', () => {
    const {output, props} = setup({});
    const container = output.props.children[1];
    const indoorOrOutdoor = container.props.children;
    indoorOrOutdoor.props.onChange({target:{}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for totalSquareFeet input onChange', () => {
    const {output, props} = setup({});
    const container = output.props.children[2];
    const input = container.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for monthlyFee input onChange', () => {
    const {output, props} = setup({});
    const container = output.props.children[3];
    const input = container.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
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
