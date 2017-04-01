/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {ApartmentIncomeForm} from './ApartmentIncomeForm';
import {ApartmentIncomeSource} from './ApartmentIncomeSource';
import {ApartmentIncome} from './ApartmentIncome';

function setup(propOverrides) {
  const props = Object.assign({
    incomes: [
      {id: 0,
        units: 20,
        bedroomCount: 1,
        squareFeet: 456,
        monthlyRent: 654
      },
      {id: 1,
        units: 25,
        bedroomCount: 2,
        squareFeet: 897,
        monthlyRent: 123
      }
    ],
    initialValues: {
      units: 34,
      monthlyRent: undefined,
      squareFeet: undefined,
      bedroomCount: 0
    },
    onSave: jasmine.createSpy('onSave'),
    onDestroy: jasmine.createSpy('onDestroy'),
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <ApartmentIncome {...props}/>
  );

  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('ApartmentIncome', () => {
  it('initial render', () => {
    const {output} = setup({});
    expect(output.type).toBe('table');
    expect(output.props.id).toBe('apartment-income');
  });
  it('should display all incomes as ApartmentIncomeSource instances', () => {
    const {output, props} = setup({});
    const apartmentIncomeSources = output.props.children[3].props.children[1];
    expect(apartmentIncomeSources.length).toBe(2);
    apartmentIncomeSources.forEach((income, i) => {
      let tmp = props.incomes[i];
      expect(income.type).toBe(ApartmentIncomeSource);
      expect(income.props.id).toBe(tmp.id);
      expect(income.props.bedroomCount).toBe(tmp.bedroomCount);
      expect(income.props.monthlyRent).toBe(tmp.monthlyRent);
      expect(income.props.units).toBe(tmp.units);
      expect(income.props.squareFeet).toBe(tmp.squareFeet);
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
    const {units, squareFeet, monthlyRent, bedroomCount} = newIncome.props;
    expect(units).toBe(props.initialValues.units);
    expect(squareFeet).toBe(props.initialValues.squareFeet);
    expect(bedroomCount).toBe(props.initialValues.bedroomCount);
    expect(monthlyRent).toBe(props.initialValues.monthlyRent);
  });
  it('should present undefined/blank vals in new income form when props.initialValues', () => {
    const {output} = setup({initialValues: undefined});
    const newIncome = output.props.children[3].props.children[0];
    const {units, squareFeet, monthlyRent, bedroomCount} = newIncome.props;
    [units, squareFeet, monthlyRent].forEach(source => expect(source).toBe(undefined)); 
    expect(bedroomCount).toBe(0);
  });
  it('should call onSave on onSubmit for valid new income', () => {
    const {props, output, renderer} = setup({});
    const newIncome = output.props.children[3].props.children[0];
    const {onChange} = newIncome.props;
    onChange({monthlyRent: 123, units: 10});
    const updatedOutput = renderer.getRenderOutput();
    const updatedNewIncome = output.props.children[3].props.children[0];
    updatedNewIncome.props.onSubmit();
    const lastCallArgs: IApartmentIncome & IIncome = props.onSave.calls.mostRecent().args[0];
    expect(lastCallArgs.monthlyRent).toBe(123);
    expect(lastCallArgs.units).toBe(10);
    expect(lastCallArgs.totalMonthlyIncome).toBe(1230);
    inputValuesShouldBeResetToInitialValues(renderer, props);
  });
  it('should not call onSave on onSubmit for invalid new income', () => {
    const {props, output, renderer} = setup({});
    const newIncome = output.props.children[3].props.children[0];
    newIncome.props.onChange({monthlyRent: '', squareFeet: 456, units: 10});
    const updatedOutput = renderer.getRenderOutput();
    const updatedNewIncome = output.props.children[3].props.children[0];
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
