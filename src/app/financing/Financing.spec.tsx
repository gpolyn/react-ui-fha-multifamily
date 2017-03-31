import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {FinanceCosts} from './FinanceCosts';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';
import {MaskedNumericInput, MinMaxLimitedNumericInput} from '../shared/MaskedNumericInput';
import {MaskedNumericIsPercentInput} from '../shared/MaskedNumericIsPercentInput';
import setup from '../shared/TestUtils';
import * as ReactDOM from 'react-dom';

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

const financing = squelchTS2345(TestUtils.renderIntoDocument(<FinanceCosts/>));
const divs = TestUtils.scryRenderedDOMComponentsWithTag(financing, 'DIV');
const inputs = TestUtils.scryRenderedDOMComponentsWithTag(financing, 'input')
const maskedNumericInputs = TestUtils.scryRenderedComponentsWithType(financing, MaskedNumericInput);
const maskedNumericPercentInputs = TestUtils.scryRenderedComponentsWithType(financing, MaskedNumericIsPercentInput);
const minMaxInputs = TestUtils.scryRenderedComponentsWithType(financing, MinMaxLimitedNumericInput);
const overrideableRadioControls = TestUtils.scryRenderedComponentsWithType(financing, OverrideableRadioControl);
const someNumber = 18;

describe('FinanceCosts', () => {

  it('should have 2 MinMaxLimitedNumericInput Components', () => {
    expect(minMaxInputs.length).toBe(2);
  });

  it('should have 12 MaskedNumericInput components', () => {
    expect(maskedNumericInputs.length).toBe(12);
  });

  it('should have 1 MaskedNumericIsPercentInput components', () => {
    expect(maskedNumericPercentInputs.length).toBe(1);
  });
  
  it('should have 1 OverrideableRadioControl Components', () => {
    expect(overrideableRadioControls.length).toBe(1);
  });

  it('should have one transaction-amount-input element containing transaction-amount input', ()=>{
    const transactionAmountInputs = inputs.filter(ele => ele.id === 'transaction-amount');
    expect(transactionAmountInputs.length).toBe(1);
    const [transactionAmountInput] = transactionAmountInputs;

    const transactionAmountContainers = divs.filter(ele => ele.id === 'transaction-amount-input');
    expect(transactionAmountContainers.length).toBe(1);
    const [transactionAmountContainer] = transactionAmountContainers;
    expect(transactionAmountContainer.contains(transactionAmountInput)).toBe(true);
  })

  it('should have one transaction-amount MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndRequired('transaction-amount');
  });

  it('should set state with value from input#transaction-amount change', ()=> {
    const eleId = 'transaction-amount';
    const name = 'transaction_amount';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one loan-request MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndRequired('loan-request');
  });

  it('should set state with value from input#loan-request change', ()=> {
    const eleId = 'loan-request';
    const name = 'loan_request';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one transaction-amount-type-selector OverrideableRadioControl w expected props', () => {
    const candidates = overrideableRadioControls.filter(ele => ele.props.id === 'transaction-amount-type-selector');
    expect(candidates.length).toBe(1);
    const [target] = candidates;
    const options = target.props['data-options'];
    expect(options.length).toBe(2);
    expect(options.some(opt => opt.id === 'purchase')).toBe(true);
    expect(options.some(opt => opt.id === 'debt')).toBe(true);
  });

  it('should set state with values from input#transaction-amount-type-selector change', ()=> {
    const candidates = inputs.filter(ele => ele.id === 'debt');
    const [debtInput] = candidates;
    const otherCandidates = inputs.filter(ele => ele.id === 'purchase');
    const [purchaseInput] = otherCandidates;
    const newVal = 'debt';
    expect(financing.state.transaction_type).not.toBe(newVal);
    TestUtils.Simulate.change(ReactDOM.findDOMNode(debtInput), getChangeEvent(newVal));
    expect(financing.state.transaction_type).toBe(newVal);
    const nextVal = 'purchase'
    TestUtils.Simulate.change(ReactDOM.findDOMNode(purchaseInput), getChangeEvent(nextVal));
    expect(financing.state.transaction_type).toBe(nextVal);
  })

  it('should have one term-in-months MinMaxLimitedNumericInput Component w expected config', () => {
    const candidates = minMaxInputs.filter(ele => ele.props.id === 'term-in-months');
    expect(candidates.length).toBe(1);
    const [target] = candidates;
    const {min, max, className} = target.props;
    expect(className).toBe('required');
    expect(min).toBe(0);
    expect(max).toBe(420);
  });

  it('should set state with value from input#term-in-months change', ()=> {
    const eleId = 'term-in-months';
    const name = 'term_in_months';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one mortgage-interest-rate MinMaxLimitedNumericInput Component w expected config', () => {
    const candidates = minMaxInputs.filter(ele => ele.props.id === 'mortgage-interest-rate');
    expect(candidates.length).toBe(1);
    const [target] = candidates;
    const {min, max, className} = target.props;
    expect(className).toBe('required');
    expect(min).toBe(0);
    expect(max).toBe(100);
  });

  it('should set state with value from input#mortgage-interest-rate change', ()=> {
    const eleId = 'mortgage-interest-rate';
    const name = 'mortgage_interest_rate';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one value-in-fee-simple MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('value-in-fee-simple');
  });

  it('should set state with value from input#value-in-fee-simple change', ()=> {
    const eleId = 'value-in-fee-simple';
    const name = 'value_in_fee_simple';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one land-value MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('land-value');
  });

  it('should set state with value from input#land-value change', ()=> {
    const eleId = 'land-value';
    const name = 'as_is_value_of_land_in_fee_simple';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one third-party-reports MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('third-party-reports');
  });

  it('should set state with value from input#third-party-reports change', ()=> {
    const eleId = 'third-party-reports';
    const name = 'third_party_reports';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one legal-and-organizational MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('legal-and-organizational');
  });

  it('should set state with value from input#legal-and-organizational change', ()=> {
    const eleId = 'legal-and-organizational';
    const name = 'legal_and_organizational';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one repairs-or-improvements MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('repairs-or-improvements');
  });

  it('should set state with value from input#repairs-or-improvements change', ()=> {
    const eleId = 'repairs-or-improvements';
    const name = 'repairs';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one survey MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('survey');
  });

  it('should set state with value from input#survey change', ()=> {
    const eleId = 'survey';
    const name = 'survey';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should have one other MaskedNumericInput Component w expected config', () => {
    inputShouldBeMin0AndOptional('other');
  });

  it('should set state with value from input#other change', ()=> {
    const eleId = 'other';
    const name = 'other';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should set state with value from input#financing-fee change', ()=> {
    const eleId = 'financing-fee';
    const name = 'financing_fee';
    inputStateChangeAsExpected(eleId, name, someNumber);
  })

  it('should set state with value from input#financing-fee-percent change', ()=> {
    const eleId = 'financing-fee-percent';
    const name = 'financing_fee_is_percent_of_loan';
    inputStateChangeAsExpected(eleId, name, true);
  })

});

function inputStateChangeAsExpected(id: string, name: string, expectedValue: any){
  const candidates = inputs.filter(ele => ele.id === id);
  const [subject] = candidates;
  expect(financing.state[name]).not.toBe(expectedValue);
  TestUtils.Simulate.change(ReactDOM.findDOMNode(subject), getChangeEvent(expectedValue));
  expect(financing.state[name]).toBe(expectedValue);
}

function inputShouldBeMin0AndOptional(id: string){
  const candidates = maskedNumericInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min, max, className} = target.props;
  expect(className).toBe('optional');
  expect(min).toBe(0);
  expect(max).toBe(undefined);
}

function inputShouldBeMin0AndRequired(id: string){
  const candidates = maskedNumericInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min, max, className} = target.props;
  expect(className).toBe('required');
  expect(min).toBe(0);
  expect(max).toBe(undefined);
}
