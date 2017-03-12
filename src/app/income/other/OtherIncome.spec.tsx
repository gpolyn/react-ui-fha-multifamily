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
  xit('should do something interesting', () => {
    const {props} = setup({});
    const component = TestUtils.renderIntoDocument(
      <OtherIncome {...props}/>
    );
    expect(component).toBe('kart');
  });
  it('should display all incomes as OtherIncomeSource instances', () => {
    const {output, props} = setup({});
    const [, otherIncomeSources] = output.props.children;
    expect(otherIncomeSources.length).toBe(2);
    let tmp;
    otherIncomeSources.forEach((income, i) => {
      tmp = props.incomes[i];
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
    const {onDelete} = secondIncomeSrc.props;
    expect(props.onDestroy.calls.count()).toBe(0);
    onDelete(0);
    expect(props.onDestroy).toHaveBeenCalledWith(0);
    props.onDestroy.calls.reset();
    const {onDelete: secondOnDelete} = firstIncomeSrc.props;
    secondOnDelete(1);
    expect(props.onDestroy).toHaveBeenCalledWith(1);
  });
  it('should call onSave on onSubmit for valid new income', () => {
    const {props, output, renderer} = setup({});
    const [newIncome] = output.props.children;
    const {onChange} = newIncome.props;
    onChange({monthlyRent: 123});
    const updatedOutput = renderer.getRenderOutput();
    const [updatedNewIncome] = updatedOutput.props.children;
    const {onSubmit} = updatedNewIncome.props;
    onSubmit();
    const lastCall = props.onSave.calls.mostRecent();
    // TODO confirm type!!!
    expect(lastCall.args[0].monthlyRent).toBe(123);
    expect(lastCall.args[0].totalMonthlyIncome).toBe(123);
  });
  it('should not call onSave on onSubmit for invalid new income', () => {
    const {props, output, renderer} = setup({});
    const [newIncome] = output.props.children;
    const {onChange} = newIncome.props;
    onChange({monthlyRent: ''});
    const updatedOutput = renderer.getRenderOutput();
    const [updatedNewIncome] = updatedOutput.props.children;
    const {onSubmit} = updatedNewIncome.props;
    onSubmit();
    expect(props.onSave).not.toHaveBeenCalled();
  });
});
