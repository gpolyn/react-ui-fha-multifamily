/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OtherIncomeForm} from './OtherIncomeForm';
import {OtherIncomeSource} from './OtherIncomeSource';
import {OtherIncome} from './OtherIncome';

function setup(propOverrides) {
  const props = Object.assign({
    incomes: [
      {id: 0,
        usage: 'kart',
        squareFeet: 456,
        monthlyRent: 654
      },
      {id: 1,
        usage: 'heart',
        squareFeet: 8098,
        monthlyRent: 1277
      }
    ],
    initialValues: {
      usage: 'blah',
      monthlyRent: 0,
      squareFeet: undefined
    },
    css: {
      usageInputName: 'use',
      squareFeetInputName: 'square-feet',
      monthlyRentInputName: 'monthly-rent',
      newIncomeContainerName: 'new-income',
      incomeSourceContainerName: 'blah'
    },
    onSave: jasmine.createSpy('onSave'),
    onDestroy: jasmine.createSpy('onDestroy'),
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <OtherIncome {...props}/>
  );

  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('OtherIncome', () => {
  it('initial render', () => {
    const {output} = setup({});
    expect(output.type).toBe('section');
    expect(output.props.className).toBe('other-income');
  });
  it('should display all incomes as OtherIncomeSource instances', () => {
    const {output, props} = setup({});
    const [, otherIncomeSources] = output.props.children;
    expect(otherIncomeSources.length).toBe(2);
    otherIncomeSources.forEach((income, i) => {
      let tmp = props.incomes[i];
      expect(income.type).toBe(OtherIncomeSource);
      expect(income.props.id).toBe(tmp.id);
      expect(income.props.usage).toBe(tmp.usage);
      expect(income.props.monthlyRent).toBe(tmp.monthlyRent);
      expect(income.props.squareFeet).toBe(tmp.squareFeet);
    });
  });
  it('should call onDestroy from income delete', () => {
    const {props, output} = setup({});
    const [, incomeSources] = output.props.children;
    const [firstIncomeSrc, secondIncomeSrc] = incomeSources;
    secondIncomeSrc.props.onDelete(0);
    expect(props.onDestroy.calls.mostRecent().args).toEqual([0]);
    firstIncomeSrc.props.onDelete(1);
    expect(props.onDestroy.calls.mostRecent().args).toEqual([1]);
  });
  it('should present props.initialValues in new income form, when provided ', () => {
    const {output, props} = setup({});
    const [newIncome] = output.props.children;
    const {usage, squareFeet, monthlyRent} = newIncome.props;
    expect(usage).toBe(props.initialValues.usage);
    expect(squareFeet).toBe(props.initialValues.squareFeet);
    expect(monthlyRent).toBe(props.initialValues.monthlyRent);
  });
  it('should present undefined/blank vals in new income form when props.initialValues', () => {
    const {output, props} = setup({initialValues: undefined});
    const [newIncome] = output.props.children;
    const {usage, squareFeet, monthlyRent} = newIncome.props;
    expect(usage).toBe(undefined);
    expect(squareFeet).toBe(undefined);
    expect(monthlyRent).toBe(undefined);
  });
  it('should call onSave on onSubmit for valid new income', () => {
    const {props, output, renderer} = setup({});
    const [newIncome] = output.props.children;
    const {onChange} = newIncome.props;
    onChange({monthlyRent: 123});
    const updatedOutput = renderer.getRenderOutput();
    const [updatedNewIncome] = updatedOutput.props.children;
    updatedNewIncome.props.onSubmit();
    const lastCallArgs: IOtherIncome & IIncome = props.onSave.calls.mostRecent().args[0];
    expect(lastCallArgs.monthlyRent).toBe(123);
    expect(lastCallArgs.totalMonthlyIncome).toBe(123);
    inputValuesShouldBeResetToInitialValues(renderer, props);
  });
  it('should not call onSave on onSubmit for invalid new income', () => {
    const {props, output, renderer} = setup({});
    const [newIncome] = output.props.children;
    newIncome.props.onChange({monthlyRent: '', squareFeet: 456, usage: 'some use'});
    const updatedOutput = renderer.getRenderOutput();
    const [updatedNewIncome] = updatedOutput.props.children;
    updatedNewIncome.props.onSubmit();
    expect(props.onSave).not.toHaveBeenCalled();
    inputValuesShouldBeResetToInitialValues(renderer, props);
  });
});

function inputValuesShouldBeResetToInitialValues(renderer, props){
  const finalUpdatedOutput = renderer.getRenderOutput();
  const [finalUpdatedNewIncome] = finalUpdatedOutput.props.children;
  expect(finalUpdatedNewIncome.props.usage).toBe(props.initialValues.usage);
  expect(finalUpdatedNewIncome.props.monthlyRent).toBe(props.initialValues.monthlyRent);
  expect(finalUpdatedNewIncome.props.squareFeet).toBe(props.initialValues.squareFeet);
}
