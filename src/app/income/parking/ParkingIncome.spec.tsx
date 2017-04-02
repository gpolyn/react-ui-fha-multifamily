/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ParkingIncomeForm} from './ParkingIncomeForm';
import {ParkingIncomeSource} from './ParkingIncomeSource';
import {ParkingIncome} from './ParkingIncome';

function setup(propOverrides) {
  const props = Object.assign({
    incomes: [
      {id: 0,
        spaces: 20,
        isIndoor: false,
        totalSquareFeet: 456,
        monthlyfee: 654
      },
      {id: 1,
        spaces: 25,
        isIndoor: true,
        totalSquareFeet: 897,
        monthlyfee: 123
      }
    ],
    initialValues: {
      spaces: 34,
      monthlyFee: undefined,
      totalSquareFeet: undefined,
      isIndoor: undefined
    },
    css: {
      newIncomeContainerName: 'new-residential-parking-income',
      spacesInputName: 'residential-parking-spaces',
      totalSquareFeetInputName: 'residential-parking-square-feet',
      monthlyFeeInputName: 'residential-parking-monthly-fee',
      indoorOrOutdoorInputName: 'residential-parking-type',
      incomeSourceContainerName: 'residential-parking-income'
    },
    onSave: jasmine.createSpy('onSave'),
    onDestroy: jasmine.createSpy('onDestroy'),
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <ParkingIncome {...props}/>
  );

  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ParkingIncome', () => {
  it('initial render', () => {
    const {output} = setup({});
    expect(output.type).toBe('table');
    // expect(output.props.id).toBe('other-income');
  });
  it('should display all incomes as ParkingIncomeSource instances', () => {
    const {output, props} = setup({});
    const parkingIncomeSources = output.props.children[3].props.children[1];
    expect(parkingIncomeSources.length).toBe(2);
    parkingIncomeSources.forEach((income, i) => {
      let tmp = props.incomes[i];
      expect(income.type).toBe(ParkingIncomeSource);
      expect(income.props.id).toBe(tmp.id);
      expect(income.props.isIndoor).toBe(tmp.isIndoor);
      expect(income.props.monthlyFee).toBe(tmp.monthlyFee);
      expect(income.props.spaces).toBe(tmp.spaces);
      expect(income.props.totalSquareFeet).toBe(tmp.totalSquareFeet);
    });
  });
  it('should call onDestroy from income delete', () => {
    const {props, output} = setup({});
    const incomeSources = output.props.children[3].props.children[1];
    const [firstIncomeSrc, secondIncomeSrc] = incomeSources;
    secondIncomeSrc.props.onDelete(0);
    expect(props.onDestroy.calls.mostRecent().args).toEqual([0]);
    firstIncomeSrc.props.onDelete(1);
    expect(props.onDestroy.calls.mostRecent().args).toEqual([1]);
  });
  it('should present props.initialValues in new income form, when provided ', () => {
    const {output, props} = setup({});
    const newIncome = output.props.children[3].props.children[0];
    const {spaces, totalSquareFeet, monthlyFee, isIndoor} = newIncome.props;
    expect(spaces).toBe(props.initialValues.spaces);
    expect(totalSquareFeet).toBe(props.initialValues.totalSquareFeet);
    expect(isIndoor).toBe(props.initialValues.isIndoor);
    expect(monthlyFee).toBe(props.initialValues.monthlyFee);
  });
  it('should present undefined/blank vals in new income form when props.initialValues', () => {
    const {output} = setup({initialValues: undefined});
    const newIncome = output.props.children[3].props.children[0];
    const {spaces, totalSquareFeet, monthlyFee, isIndoor} = newIncome.props;
    [spaces, totalSquareFeet, monthlyFee].forEach(source => expect(source).toBe(undefined)); 
    expect(isIndoor).toBe(false);
  });
  it('should call onSave on onSubmit for valid new income', () => {
    const {props, output, renderer} = setup({});
    const newIncome = output.props.children[3].props.children[0];
    const {onChange} = newIncome.props;
    onChange({monthlyFee: 123, spaces: 10});
    const updatedOutput = renderer.getRenderOutput();
    const updatedNewIncome = output.props.children[3].props.children[0];
    updatedNewIncome.props.onSubmit();
    const lastCallArgs: IParkingIncome & IIncome = props.onSave.calls.mostRecent().args[0];
    expect(lastCallArgs.monthlyFee).toBe(123);
    expect(lastCallArgs.spaces).toBe(10);
    expect(lastCallArgs.totalMonthlyIncome).toBe(1230);
    inputValuesShouldBeResetToInitialValues(renderer, props);
  });
  it('should not call onSave on onSubmit for invalid new income', () => {
    const {props, output, renderer} = setup({});
    const newIncome = output.props.children[3].props.children[0];
    newIncome.props.onChange({monthlyFee: '', totalSquareFeet: 456, spaces: 10});
    const updatedOutput = renderer.getRenderOutput();

    const updatedNewIncome = output.props.children[3].props.children[0];
    updatedNewIncome.props.onSubmit();
    expect(props.onSave).not.toHaveBeenCalled();
    inputValuesShouldBeResetToInitialValues(renderer, props);
  });
});

function inputValuesShouldBeResetToInitialValues(renderer, props){
  const finalUpdatedOutput = renderer.getRenderOutput();
  // const [finalUpdatedNewIncome] = finalUpdatedOutput.props.children;
  const finalUpdatedNewIncome = finalUpdatedOutput.props.children[3].props.children[0];
  expect(finalUpdatedNewIncome.props.usage).toBe(props.initialValues.usage);
  expect(finalUpdatedNewIncome.props.monthlyRent).toBe(props.initialValues.monthlyRent);
  expect(finalUpdatedNewIncome.props.squareFeet).toBe(props.initialValues.squareFeet);
}
