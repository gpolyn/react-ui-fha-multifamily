import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import {Main} from './app/main';
import {OtherIncome} from './app/income/other/OtherIncome';
import {ParkingIncome} from './app/income/parking/ParkingIncome';
import {ApartmentIncome} from './app/income/apartment/ApartmentIncome';
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

function render() {
  const totalGrossCommercial = [...commercialIncomes, ...commercialParkingIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
    total + income,
    0
  );
  const totalGrossResidential = [...apartmentIncomes, ...otherIncomes, ...parkingIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
    total + income,
    0
  );
  console.log('gross residential', totalGrossResidential);
  console.log('gross commercial', totalGrossCommercial);
  ReactDOM.render(
    <div>
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
     </div>,
     root
  );
}

render();
