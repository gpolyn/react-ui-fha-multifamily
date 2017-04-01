import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';
import {OverrideableSelectControl} from '../shared/OverrideableSelectControl';
import {OverrideableCheckboxControl} from '../shared/OverrideableCheckboxControl';
import {MaskedNumericInput, MinMaxLimitedNumericInput, MinLimitedNumericInput} from '../shared/MaskedNumericInput';
import {MaskedNumericIsPercentInput} from '../shared/MaskedNumericIsPercentInput';
import {DollarSpan} from '../shared/DollarSpan';
import {App} from './App';
import {ApartmentIncome} from '../income/apartment/ApartmentIncome';
import {OtherIncome} from '../income/other/OtherIncome';
import {ParkingIncome} from '../income/parking/ParkingIncome';
import * as ReactDOM from 'react-dom';

const someNumber = 18;
const totalRadioControls = 2;
const totalNumberOfInputs = 45;
const totalNumberOfMinLimitedInputs = 13;
const totalNumberOfMinMaxLimitedInputs = 4;
const totalCheckBoxes = 3;
const totalSelectControls = 2;
const totalNumberOfDollarSpans = 6;

let app;
// let app = squelchTS2345(TestUtils.renderIntoDocument(<App />));
let inputs;
let maskedNumericInputs;
let minMaxInputs;
let minInputs;
let overrideableRadioControls;
let overrideableCheckboxControls;
let dollarSpans;
let selectControls;

//const subj = ReactDOM.findDOMNode(converted);

describe('App', () => {

  describe('structure', ()=> {

    app = squelchTS2345(TestUtils.renderIntoDocument(<App />));
    overrideableRadioControls = getAllRadioControls();
    inputs = getAllInputs();
    maskedNumericInputs = TestUtils.scryRenderedComponentsWithType(app, MaskedNumericInput);
    minMaxInputs = TestUtils.scryRenderedComponentsWithType(app, MinMaxLimitedNumericInput);
    minInputs = getAllMinLimitedNumericInput();
    overrideableCheckboxControls = TestUtils.scryRenderedComponentsWithType(app, OverrideableCheckboxControl);
    selectControls = TestUtils.scryRenderedComponentsWithType(app, OverrideableSelectControl);

    it(`should have ${totalNumberOfInputs} inputs`, () => {
      expect(inputs.length).toBe(totalNumberOfInputs);
    })

    it('should have 1 ApartmentIncome component', ()=>{
      expect(TestUtils.findRenderedComponentWithType(app, ApartmentIncome)).not.toBe(null);
    });

    it('should have 2 OtherIncome components', ()=>{
      expect(TestUtils.scryRenderedComponentsWithType(app, OtherIncome).length).toBe(2);
    });

    it('should have 2 Parking components', ()=>{
      expect(TestUtils.scryRenderedComponentsWithType(app, ParkingIncome).length).toBe(2);
    });

    it(`should have ${totalNumberOfMinMaxLimitedInputs} MinMaxLimitedNumericInput components`, () => {
      expect(minMaxInputs.length).toBe(totalNumberOfMinMaxLimitedInputs);
    })

    it('should have one residential-occupancy-percent MinMaxLimitedNumericInput Component w expected config', () => {
      thereShouldBeOneSuchMinMaxInput('residential-occupancy-percent', 0, 95);
    });

    it('should have one commercial-occupancy-percent MinMaxLimitedNumericInput Component w expected config', () => {
      thereShouldBeOneSuchMinMaxInput('commercial-occupancy-percent', 0, 80);
    });

    it('should have one mortgage-interest-rate MinMaxLimitedNumericInput Component w expected config', () => {
      thereShouldBeOneSuchMinMaxInput('mortgage-interest-rate', 0, 100);
    });

    it('should have one term-in-months MinMaxLimitedNumericInput Component w expected config', () => {
      thereShouldBeOneSuchMinMaxInput('term-in-months', 0, 420);
    });

    it(`should have ${totalNumberOfMinLimitedInputs} MinLimitedNumericInput components`, () => {
      expect(minInputs.length).toBe(totalNumberOfMinLimitedInputs);
    })

    it('should have certain MinLimitedNumericInput Component instances w expected config', () => {
      const ids = [
        'transaction-amount',
        'loan-request',
        'value-in-fee-simple',
        'other',
        'survey',
        'total',
        'legal-and-organizational',
        'third-party-reports',
        'land-value',
        'financing-fee',
        'title-and-recording',
        'repairs-or-improvements',
      ];
      //expect(ids.length).toBe(totalNumberOfMinLimitedInputs)
      ids.forEach( id => {
        inputShouldBeMinLimitedAt0(id)
      });
    });

    it(`should have ${totalNumberOfDollarSpans} DollarSpan components`, () => {
      dollarSpans = TestUtils.scryRenderedComponentsWithType(app, DollarSpan);
      expect(dollarSpans.length).toBe(totalNumberOfDollarSpans);
    });

    xit('should have certain DollarSpan Component instances', () => {
      const ids = [
        'effective-income',
        'net-operating-income',
        'gross-commercial-income',
        'gross-residential-income',
        'effective-gross-residential-income',
        'effective-gross-commercial-income'
      ];
      ids.forEach(id => thereShouldBeOneSuchDollarSpan(id));
    });

    it(`it should have ${totalCheckBoxes} OverrideableCheckboxControl components`, () => {
      expect(overrideableCheckboxControls.length).toBe(totalCheckBoxes);
    });

    it('should have certain checkbox Component instances', () => {
      const ids = [
        'title-and-recording-percent',
        'financing-fee-percent',
        'totalOperatingExpenseIsPercent'
      ]; 
      ids.forEach( id => thereShouldBeOneSuchCheckbox(id));
    });

    it(`should have ${totalSelectControls} OverrideableSelectControl components`, () => {
      expect(selectControls.length).toBe(totalSelectControls);
    });

    it('should have one OverrideableSelectControl id == high-cost-setting', () => {
      thereShouldBeOneSuchSelect('high-cost-setting', 80);
    });

    it('should have one OverrideableSelectControl id == elevator-status', () => {
      thereShouldBeOneSuchSelect('elevator-status', 2, ['true', 'false']);
    });

    it(`should have ${totalRadioControls} radio controls`, () => {
      expect(overrideableRadioControls.length).toBe(totalRadioControls);
    });

    it('should have a OverrideableRadioControl with certain data-options of size 3', () => {
      const arbitraryChoice = overrideableRadioControls[0];
      expect(arbitraryChoice.props['data-options'].length).toBe(3);
      const opts = arbitraryChoice.props['data-options'];
      ['market', 'affordable', 'subsidized'].forEach( ( opt, idx ) =>{
        expect(opts[idx].id).toBe(opt);
      });
    })

    it('should have a OverrideableRadioControl with certain data-options of size 2', () => {
      const arbitraryChoice = overrideableRadioControls[1];    
      expect(arbitraryChoice.props['data-options'].length).toBe(2);
      const opts = arbitraryChoice.props['data-options'];
      ['purchase', 'debt'].forEach( ( opt, idx ) =>{
        expect(opts[idx].id).toBe(opt);
      });
    })

  });

  describe('behavior', ()=> {

    beforeEach(function () {

      localStorage.clear();

      app = squelchTS2345(TestUtils.renderIntoDocument(<App />));
      inputs = getAllInputs();
      maskedNumericInputs = TestUtils.scryRenderedComponentsWithType(app, MaskedNumericInput);
      minMaxInputs = TestUtils.scryRenderedComponentsWithType(app, MinMaxLimitedNumericInput);
      minInputs = getAllMinLimitedNumericInput();
      overrideableCheckboxControls = TestUtils.scryRenderedComponentsWithType(app, OverrideableCheckboxControl);
      selectControls = TestUtils.scryRenderedComponentsWithType(app, OverrideableSelectControl);
    });

    it('should update state with new apartment income', () => {
      const domApp = ReactDOM.findDOMNode(app);
      const units = domApp.querySelector('input.apartment-unit-count');
      (units as HTMLInputElement).value = String(someNumber);
      TestUtils.Simulate.change(units);
      const monthlyRentField = domApp.querySelector('input.apartment-monthly-rent');
      const rentAmount = someNumber * 2;
      (monthlyRentField as HTMLInputElement).value = String(rentAmount);
      TestUtils.Simulate.change(monthlyRentField);
      const fm = domApp.querySelector('tr#new-apartment-income form');
      TestUtils.Simulate.submit(fm);
      expect(app.state.apartmentIncomes.length).toBe(1);
      const income = app.state.apartmentIncomes[0];
      expect(income.monthlyRent).toBe(rentAmount)
      expect(income.units).toBe(someNumber)
      const btn = domApp.querySelector('button.apartment-income-destroy');
      TestUtils.Simulate.click(btn);
      expect(app.state.apartmentIncomes.length).toBe(0);
    })

    it('should update state with new other residential income', () => {
      const domApp = ReactDOM.findDOMNode(app);
      const monthlyRentField = domApp.querySelector('input.other-residential-monthly-rent');
      const rentAmount = someNumber * 2;
      (monthlyRentField as HTMLInputElement).value = String(rentAmount);
      TestUtils.Simulate.change(monthlyRentField);
      const fm = domApp.querySelector('form#new-other-income');
      TestUtils.Simulate.submit(fm);
      expect(app.state.otherIncomes.length).toBe(1);
      const income = app.state.otherIncomes[0];
      expect(income.monthlyRent).toBe(rentAmount)
      const btn = domApp.querySelector('button.simple-income-source-destroy');
      TestUtils.Simulate.click(btn);
      expect(app.state.apartmentIncomes.length).toBe(0);
    })

    it('should update state with new commercial income', () => {
      const domApp = ReactDOM.findDOMNode(app);
      const commercialRent = domApp.querySelector('input.commercial-monthly-rent');
      const rentAmount = someNumber * 2;
      (commercialRent as HTMLInputElement).value = String(rentAmount);
      TestUtils.Simulate.change(commercialRent);
      const fm = domApp.querySelector('form#new-commercial-income');
      TestUtils.Simulate.submit(fm);
      expect(app.state.commercialIncomes.length).toBe(1);
      const income = app.state.commercialIncomes[0];
      expect(income.monthlyRent).toBe(rentAmount)
      const btn = domApp.querySelector('.commercial-income button.simple-income-source-destroy');
      TestUtils.Simulate.click(btn);
      expect(app.state.commercialIncomes.length).toBe(0);
    })

    it('should update state with commercial parking income', () => {
      const domApp = ReactDOM.findDOMNode(app);
      const spaces = domApp.querySelector('input.commercial-parking-spaces');
      (spaces as HTMLInputElement).value = String(someNumber);
      TestUtils.Simulate.change(spaces);
      const rent = domApp.querySelector('input.commercial-parking-monthly-fee');
      const rentAmount = someNumber * 2;
      (rent as HTMLInputElement).value = String(rentAmount);
      TestUtils.Simulate.change(rent);
      const fm = domApp.querySelector('form#new-commercial-parking-income');
      TestUtils.Simulate.submit(fm);
      expect(app.state.commercialParkingIncomes.length).toBe(1);
      const income = app.state.commercialParkingIncomes[0];
      expect(income.monthlyFee).toBe(rentAmount)
      expect(income.spaces).toBe(someNumber)
      const btn = domApp.querySelector('.commercial-parking-income .parking-income-destroy');
      TestUtils.Simulate.click(btn);
      expect(app.state.commercialParkingIncomes.length).toBe(0);
    })

    it('should update state with new residential parking income', () => {
      const domApp = ReactDOM.findDOMNode(app);
      const spaces = domApp.querySelector('input.residential-parking-spaces');
      (spaces as HTMLInputElement).value = String(someNumber);
      TestUtils.Simulate.change(spaces);
      const rent = domApp.querySelector('input.residential-parking-monthly-fee');
      const rentAmount = someNumber * 2;
      (rent as HTMLInputElement).value = String(rentAmount);
      TestUtils.Simulate.change(rent);
      const fm = domApp.querySelector('form#new-residential-parking-income');
      TestUtils.Simulate.submit(fm);
      expect(app.state.parkingIncomes.length).toBe(1);
      const income = app.state.parkingIncomes[0];
      expect(income.monthlyFee).toBe(rentAmount)
      expect(income.spaces).toBe(someNumber)
      const btn = domApp.querySelector('.residential-parking-income .parking-income-destroy');
      TestUtils.Simulate.click(btn);
      expect(app.state.parkingIncomes.length).toBe(0);
    })

    it('should have input#market that changes app state', () =>{
      inputStateChangeAsExpected('market', 'affordability', 'market');
    })

    it('should have input#affordable that changes app state', () =>{
      inputStateChangeAsExpected('affordable', 'affordability', 'affordable');
    })

    it('should have input#subsidized that changes app state', () =>{
      inputStateChangeAsExpected('subsidized', 'affordability', 'subsidized');
    })

    it('should have input#purchase that changes app state', () =>{
      inputStateChangeAsExpected('purchase', 'transaction_type', 'purchase');
    })

    it('should have input#debt that changes app state', () =>{
      inputStateChangeAsExpected('debt', 'transaction_type', 'debt');
    })

    it('should change state when title-and-recording-percent is checked', () => {
      const chkbx = getInput('title-and-recording-percent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      inputStateChangeAsExpected('title-and-recording-percent', 'title_and_recording_is_percent_of_loan', true);
    });

    it('should change the component id title-and-recording to a MinMaxLimitedNumericInput when title-and-recording-percent is checked', ()=>{
      const chkbx = getInput('title-and-recording-percent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      TestUtils.Simulate.change(chkbx, getChangeEvent(true));
      expect((chkbx as HTMLInputElement).checked).toBe(true);
      const inputsRev = getAllInputs();
      thereShouldBeOneSuchInput('title-and-recording', inputsRev);
      expect(inputsRev.length).toBe(totalNumberOfInputs);
      expect(getAllMinLimitedNumericInput().length).toBe(totalNumberOfMinLimitedInputs - 1);
      const updatedMinMaxInputs = getAllMinMaxLimitedNumericInput();
      expect(updatedMinMaxInputs.length).toBe(totalNumberOfMinMaxLimitedInputs + 1);
      thereShouldBeOneSuchMinMaxInput('title-and-recording', 0, 100, updatedMinMaxInputs);
      inputStateChangeAsExpected('title-and-recording', 'title_and_recording', someNumber, inputsRev);
    })

    it('should change state when financing-fee-percent is checked', () => {
      const chkbx = getInput('financing-fee-percent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      inputStateChangeAsExpected('financing-fee-percent', 'financing_fee_is_percent_of_loan', true);
    });

    it('should change the component id financing-fee to a MinMaxLimitedNumericInput when financing-fee-percent is checked', ()=>{
      const chkbx = getInput('financing-fee-percent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      TestUtils.Simulate.change(chkbx, getChangeEvent(true));
      expect((chkbx as HTMLInputElement).checked).toBe(true);
      const inputsRev = getAllInputs();
      thereShouldBeOneSuchInput('financing-fee', inputsRev);
      expect(inputsRev.length).toBe(totalNumberOfInputs);
      expect(getAllMinLimitedNumericInput().length).toBe(totalNumberOfMinLimitedInputs - 1);
      const updatedMinMaxInputs = getAllMinMaxLimitedNumericInput();
      expect(updatedMinMaxInputs.length).toBe(totalNumberOfMinMaxLimitedInputs + 1);
      thereShouldBeOneSuchMinMaxInput('financing-fee', 0, 100, updatedMinMaxInputs);
      inputStateChangeAsExpected('financing-fee', 'financing_fee', someNumber, inputsRev);
    })

    it('should change state when totalOperatingExpenseIsPercent is checked', () => {
      const chkbx = getInput('totalOperatingExpenseIsPercent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      inputStateChangeAsExpected('totalOperatingExpenseIsPercent', 'operating_expenses_is_percent_of_effective_gross_income', true);
    });

    it('should change the component id total to a MinLimitedNumericInput when totalOperatingExpenseIsPercent is checked', ()=>{
      const chkbx = getInput('totalOperatingExpenseIsPercent', inputs);
      expect((chkbx as HTMLInputElement).checked).not.toBe(true);
      TestUtils.Simulate.change(chkbx, getChangeEvent(true));
      expect((chkbx as HTMLInputElement).checked).toBe(true);
      const inputsRev = getAllInputs();
      thereShouldBeOneSuchInput('total', inputsRev);
      expect(inputsRev.length).toBe(totalNumberOfInputs);
      expect(getAllMinLimitedNumericInput().length).toBe(totalNumberOfMinLimitedInputs - 1);
      const updatedMinMaxInputs = getAllMinMaxLimitedNumericInput();
      expect(updatedMinMaxInputs.length).toBe(totalNumberOfMinMaxLimitedInputs + 1);
      thereShouldBeOneSuchMinMaxInput('total', 0, 100, updatedMinMaxInputs);
      inputStateChangeAsExpected('total', 'operating_expenses', someNumber, inputsRev);
    })


    it('should set state with value from input#commercial-occupancy-percent change', ()=> {
      const eleId = 'commercial-occupancy-percent';
      const name = 'commercial_occupancy_percent';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#residential-occupancy-percent change', ()=> {
      const eleId = 'residential-occupancy-percent';
      const name = 'residential_occupancy_percent';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })


    it('should set state with value from input#transaction-amount change', ()=> {
      const eleId = 'transaction-amount';
      const name = 'transaction_amount';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#loan-request change', ()=> {
      const eleId = 'loan-request';
      const name = 'loan_request';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#value-in-fee-simple change', ()=> {
      const eleId = 'value-in-fee-simple';
      const name = 'value_in_fee_simple';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#other change', ()=> {
      const eleId = 'other';
      const name = eleId;
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#survey change', ()=> {
      const eleId = 'survey';
      const name = eleId;
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#total change', ()=> {
      const eleId = 'total';
      const name = 'operating_expenses'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#legal-and-organizational change', ()=> {
      const eleId = 'legal-and-organizational';
      const name = 'legal_and_organizational'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#third-party-reports change', ()=> {
      const eleId = 'third-party-reports';
      const name = 'third_party_reports'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#land-value change', ()=> {
      const eleId = 'land-value';
      const name = 'as_is_value_of_land_in_fee_simple';
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#financing-fee change', ()=> {
      const eleId = 'financing-fee';
      const name = 'financing_fee'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#title-and-recording change', ()=> {
      const eleId = 'title-and-recording';
      const name = 'title_and_recording'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#repairs-or-improvements change', ()=> {
      const eleId = 'repairs-or-improvements';
      const name = 'repairs'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#residential-occupancy-percent change', ()=> {
      const eleId = 'residential-occupancy-percent';
      const name = 'residential_occupancy_percent'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#commercial-occupancy-percent change', ()=> {
      const eleId = 'commercial-occupancy-percent';
      const name = 'commercial_occupancy_percent'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#mortgage-interest-rate change', ()=> {
      const eleId = 'mortgage-interest-rate';
      const name = 'mortgage_interest_rate'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

    it('should set state with value from input#term-in-months change', ()=> {
      const eleId = 'term-in-months';
      const name = 'term_in_months'
      inputStateChangeAsExpected(eleId, name, someNumber);
    })

  });

});

function inputStateChangeAsExpected(id: string, name: string, expectedValue: any, newInputs?: any){
  const which = newInputs || inputs;
  const candidates = which.filter(ele => ele.id === id);
  if (candidates.length > 1){
    throw `more than one ${id} input`;
  }
  const [subject] = candidates;
  expect(app.state[name]).not.toBe(expectedValue);
  TestUtils.Simulate.change(ReactDOM.findDOMNode(subject), getChangeEvent(expectedValue));
  expect(app.state[name]).toBe(expectedValue);
}

function inputShouldBeMinLimitedAt0(id: string){
  const candidates = minInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min} = target.props;
  expect(min).toBe(0);
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
  const candidates = minInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min, max, className} = target.props;
  expect(className).toBe('required');
  expect(min).toBe(0);
}

function thereShouldBeOneSuchInput(id: string, candidates?: any){
  const whichInputs = candidates || inputs; 
  const a = whichInputs.filter(ele => ele.id === id);
  expect(a.length).toBe(1);
}

function thereShouldBeOneSuchMinLimitedInput(id: string, givenMin: number){
  const candidates = minInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min, max, className} = target.props;
  expect(min).toBe(givenMin);
}

function thereShouldBeOneSuchMinMaxInput(id: string, givenMin: number, givenMax: number, inputs?: any){
  const whichInputs = inputs || minMaxInputs;
  const candidates = whichInputs.filter(ele => ele.props.id === id);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {min, max, className} = target.props;
  expect(min).toBe(givenMin);
  expect(max).toBe(givenMax);
}

function thereShouldBeOneSuchDollarSpan(givenId: string){
  const candidates = dollarSpans.filter(ele => ele.props.id === givenId);
  expect(candidates.length).toBe(1);
}

function thereShouldBeOneSuchCheckbox(givenId: string){
  const candidates = overrideableCheckboxControls.filter(ele => ele.props.id === givenId);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const {id, className} = target.props;
  expect(id).toBe(givenId);
}

function thereShouldBeOneSuchSelect(givenId: string, totalOptions?: number, options?: string[]){
  const candidates = selectControls.filter(ele => ele.props.id === givenId);
  expect(candidates.length).toBe(1);
  const [target] = candidates;
  const dataOpts = target.props['data-options'];
  totalOptions && expect(dataOpts.length).toBe(totalOptions);
  if (options){
  }
}

function getChangeEvent(val: any){
  const blah = {target: {value: val}} as React.ChangeEvent<any>;
  return blah;
}

function squelchTS2345(x: any){
  const converted = x as React.Component<any,any>; 
  return converted;
}

function getAllInputs(){
  return TestUtils.scryRenderedDOMComponentsWithTag(app, 'input');
}

function getAllMinLimitedNumericInput(){
  return TestUtils.scryRenderedComponentsWithType(app, MinLimitedNumericInput);
}

function getAllMinMaxLimitedNumericInput(){
  return TestUtils.scryRenderedComponentsWithType(app, MinMaxLimitedNumericInput);
}

function getInput(id: string, candidates: any){
  const a = candidates.filter(x => x.id === id);
  if (a.length > 1){
    throw `more than one ${id} input`;
  }
  const [b] = a;
  return b;
}

function getAllRadioControls(){
  return TestUtils.scryRenderedComponentsWithType(app, OverrideableRadioControl);
}
