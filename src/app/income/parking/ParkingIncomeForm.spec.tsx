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
    expect(output.type).toBe('form');
    expect(output.props.id).toBe(props.css.newIncomeContainerName);
    const [spaces, indoorOutdoor, sqFt, fee, submitInput] = output.props.children;

    expect(indoorOutdoor.type).toBe('select');
    const [option1, option2] = indoorOutdoor.props.children;
    expect(option1.type).toBe('option');
    expect(option1.props.children).toBe('indoor');
    expect(option2.type).toBe('option');
    expect(option2.props.children).toBe('outdoor');

    expect(spaces.type).toBe('label');
    const [spacesLabelText, spacesInput] = spaces.props.children;
    expect(spacesLabelText).toBe('spaces');
    expect(spacesInput.type).toBe('input');
    expect(spacesInput.props.className).toBe(props.css.spacesInputName);
    expect(spacesInput.props.name).toBe('spaces');

    expect(sqFt.type).toBe('label');
    const [sqFtLabeltext, sqFtInput] = sqFt.props.children;
    expect(sqFtLabeltext).toBe('total square feet');
    expect(sqFtInput.type).toBe('input');
    expect(sqFtInput.props.className).toBe(props.css.squareFeetInputName);
    expect(sqFtInput.props.name).toBe('totalSquareFeet');

    expect(fee.type).toBe('label');
    const [feeLabelText, feeInput] = fee.props.children;
    expect(feeLabelText).toBe('monthly fee');
    expect(feeInput.type).toBe('input');
    expect(feeInput.props.className).toBe(props.css.monthlyFeeInputName);
    expect(feeInput.props.name).toBe('monthlyFee');

    expect(submitInput.type).toBe('input');
    expect(submitInput.props.type).toBe('submit');
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
    const [spaces, indoorOrOutdoor, sqFt, fee] = output.props.children;
    expect(spaces.props.children[1].props.value).toBe(expectedFieldVals[0]);
    expect(indoorOrOutdoor.props.value).toBe(expectedFieldVals[1]);
    expect(sqFt.props.children[1].props.value).toBe(expectedFieldVals[2]);
    expect(fee.props.children[1].props.value).toBe(expectedFieldVals[3]);
  });
  it('should call onChange for spaces input onChange', () => {
    const {output, props} = setup({});
    const [spaces] = output.props.children;
    const [, input] = spaces.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for indoor/outdoor selector onChange', () => {
    const {output, props} = setup({});
    const [, indoorOrOutdoor] = output.props.children;
    indoorOrOutdoor.props.onChange({target:{}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for totalSquareFeet input onChange', () => {
    const {output, props} = setup({});
    const [, , squareFeet] = output.props.children;
    const [, input] = squareFeet.props.children;
    input.props.onChange({target: {}});
    expect(props.onChange).toHaveBeenCalled();
  });
  it('should call onChange for monthlyFee input onChange', () => {
    const {output, props} = setup({});
    const [, , , monthlyFee] = output.props.children;
    const [, input] = monthlyFee.props.children;
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
