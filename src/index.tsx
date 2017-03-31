import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import {Main} from './app/main';
import {App} from './app/containers/App';
import {OtherIncome} from './app/income/other/OtherIncome';
import {ParkingIncome} from './app/income/parking/ParkingIncome';
import {ApartmentIncome} from './app/income/apartment/ApartmentIncome';
import {EffectiveGrossIncome} from './app/egi/EffectiveGrossIncome';
//import {Project} from './app/Project';
import {Project} from './app/views/Project';
import {SharedInput2} from './app/shared/SharedInput2';
import {PercentableInput} from './app/shared/PercentableInput';
import {OverrideableCheckboxControl} from './app/shared/OverrideableCheckboxControl';
import {TransactionAmountAndType} from './app/financing/TransactionAmountAndType';
import {FinanceCosts} from './app/financing/FinanceCosts';
import {MaskedNumericIsPercentInput} from './app/shared/MaskedNumericIsPercentInput';
import {MaskedNumericInput, MinLimitedNumericInput} from './app/shared/MaskedNumericInput';
import {withModifiedOnChange} from './app/shared/ModifyChange';
import {SharedInputContainer} from './app/SharedInputContainer';
import {SharedCheckboxContainer} from './app/SharedCheckboxContainer';
import {SharedSelectContainer} from './app/SharedSelectContainer';
import incomes from './app/Reducers';
import * as actions from './app/Actions';

import './index.css';

let otherIncomes = [
  {id:0, totalMonthlyIncome: 456, monthlyRent: 23, usage: 'fart-space', squareFeet: 432},
  {id:1, totalMonthlyIncome: 56, monthlyRent: 8765, usage: 'blah', squareFeet: 31}
];

let commercialIncomes: any[] = [
  {id:0, totalMonthlyIncome: 822, monthlyRent: 822, usage: 'a commercial use', squareFeet: 302},
  {id:1, totalMonthlyIncome: 890, monthlyRent: 890, usage: 'some commercial use', squareFeet: 61}
];

let parkingIncomes = [
  {id:0, totalMonthlyIncome: 822, monthlyFee: 22, isIndoor: true, totalSquareFeet: 102, spaces: 204},
  {id:1, totalMonthlyIncome: 890, monthlyFee: 590, isIndoor: false, totalSquareFeet: 761, spaces: 23}
];

let commercialParkingIncomes = [
  {id:0, totalMonthlyIncome: 93, monthlyFee: 2289, isIndoor: false, totalSquareFeet: 182, spaces: 234}
];

let apartmentIncomes = [
  {id:0, totalMonthlyIncome: 93, monthlyRent: 209, bedroomCount: 2, squareFeet: 82, units: 234}
];

function deleteOtherIncome(id: any) {
  otherIncomes = incomes(otherIncomes, actions.deleteIncome(id));
  render();
};

function addOtherIncome(income: any) {
  otherIncomes = incomes(otherIncomes, actions.addIncome(income));
  render();
};

function deleteCommercialIncome(id: any) {
  commercialIncomes = incomes(commercialIncomes, actions.deleteIncome(id));
  render();
};

//let initialFinanceCosts = {term_in_months: 400}
let initialFinanceCosts = {}

function financeCostsChange(e: any){
  console.log('financeCostsChange', e);
  initialFinanceCosts = {...initialFinanceCosts, ...e};
  console.log('new costs', initialFinanceCosts)
  render();
}

function addCommercialIncome(income: any) {
  commercialIncomes = incomes(commercialIncomes, actions.addIncome(income));
  render();
};

function deleteParkingIncome(id: any) {
  parkingIncomes = incomes(parkingIncomes, actions.deleteIncome(id));
  render();
};

function addParkingIncome(income: any) {
  parkingIncomes = incomes(parkingIncomes, actions.addIncome(income));
  render();
};

function deleteCommercialParkingIncome(id: any) {
  commercialParkingIncomes = incomes(commercialParkingIncomes, actions.deleteIncome(id));
  render();
};

function addCommercialParkingIncome(income: any) {
  commercialParkingIncomes = incomes(commercialParkingIncomes, actions.addIncome(income));
  render();
};

function deleteApartmentIncome(id: any) {
  apartmentIncomes = incomes(apartmentIncomes, actions.deleteIncome(id));
  render();
};

function addApartmentIncome(income: any) {
  apartmentIncomes = incomes(apartmentIncomes, actions.addIncome(income));
  render();
};

const root = document.getElementById('root')
const otherIncomeCSS = {
  newIncomeContainerName: 'new-other-income',
  usageInputName: 'other-residential-use usage',
  squareFeetInputName: 'other-residential-square-feet',
  monthlyRentInputName: 'other-residential-monthly-rent',
  incomeSourceContainerName: 'other-residential-income'
};
const commercialIncomeCSS = {
  newIncomeContainerName: 'new-commercial-income',
  usageInputName: 'commercial-use usage',
  squareFeetInputName: 'commercial-square-feet',
  monthlyRentInputName: 'commercial-monthly-rent',
  incomeSourceContainerName: 'commercial-income'
};
const commercialParkingIncomeCSS = {
  newIncomeContainerName: 'new-commercial-parking-income',
  spacesInputName: 'commercial-parking-spaces',
  totalSquareFeetInputName: 'commercial-parking-square-feet',
  monthlyFeeInputName: 'commercial-parking-monthly-fee',
  indoorOrOutdoorInputName: 'commercial-parking-type',
  incomeSourceContainerName: 'commercial-parking-income'
};
const parkingIncomeCSS = {
  newIncomeContainerName: 'new-residential-parking-income',
  spacesInputName: 'residential-parking-spaces',
  totalSquareFeetInputName: 'residential-parking-square-feet',
  monthlyFeeInputName: 'residential-parking-monthly-fee',
  indoorOrOutdoorInputName: 'residential-parking-type',
  incomeSourceContainerName: 'residential-parking-income'
};

let totalGrossResidential = 0;
let residentialOccupancyPercent = 90;
function residentialOccupancyHandler(newOccupancy: any){
  residentialOccupancyPercent = newOccupancy;
  render();
}

function onChange(data: any){
  console.log(data);
}

let totalGrossCommercial = 0;
let commercialOccupancyPercent = 90;
function commercialOccupancyHandler(newOccupancy: any){
  commercialOccupancyPercent = newOccupancy;
  render();
}

function render() {
  totalGrossCommercial = [...commercialIncomes, ...commercialParkingIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
    total + income,
    0
  );
  totalGrossResidential = [...apartmentIncomes, ...otherIncomes, ...parkingIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
    total + income,
    0
  );
  const residentialEGI = totalGrossResidential * residentialOccupancyPercent/100.0;
  const commercialEGI = totalGrossCommercial * commercialOccupancyPercent/100.0;
  const effectiveIncome = residentialEGI + commercialEGI;

  const somethingWild = withModifiedOnChange(SharedInputContainer);

  ReactDOM.render(
    <div>
        <App />
     </div>,
     root
  );
}

render();
/*
      <ApartmentIncome
       incomes={apartmentIncomes}
       onDestroy={deleteApartmentIncome}
       onSave={addApartmentIncome}
       />
      <ParkingIncome
       incomes={parkingIncomes}
       onDestroy={deleteParkingIncome}
       onSave={addParkingIncome}
       css={parkingIncomeCSS}
       />
      <ParkingIncome
       incomes={commercialParkingIncomes}
       onDestroy={deleteCommercialParkingIncome}
       onSave={addCommercialParkingIncome}
       css={commercialParkingIncomeCSS}
       />
      <OtherIncome
       incomes={commercialIncomes}
       onDestroy={deleteCommercialIncome}
       onSave={addCommercialIncome}
       css={commercialIncomeCSS}
       />
      <OtherIncome
       incomes={otherIncomes}
       onDestroy={deleteOtherIncome}
       onSave={addOtherIncome}
       css={otherIncomeCSS}
       />
<EffectiveGrossIncome
grossIncome={totalGrossResidential}
occupancyPercent={residentialOccupancyPercent}
maxOccupancyPercent={91}
onChange={residentialOccupancyHandler}
grossIncomeLabelText={'gross residential'}
egi = {residentialEGI}
effectiveIncomeLabelText={'residential income'}
/>
<EffectiveGrossIncome
grossIncome={totalGrossCommercial}
occupancyPercent={commercialOccupancyPercent}
maxOccupancyPercent={92}
egi={commercialEGI}
onChange={commercialOccupancyHandler}
grossIncomeLabelText={'other gross residential'}
effectiveIncomeLabelText={'other residential income'}
/>
${effectiveIncome}
*/
