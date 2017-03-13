import 'es6-promise';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import {Main} from './app/main';
import {OtherIncome} from './app/income/other/OtherIncome';
import incomes from './app/Reducers';
import * as actions from './app/Actions';

import './index.css';

let otherIncomes = [
  {id:0, totalMonthlyIncome: 456, monthlyRent: 23, usage: 'fart-space', squareFeet: 432},
  {id:1, totalMonthlyIncome: 56, monthlyRent: 8765, usage: 'blah', squareFeet: 31}
];

let commercialIncomes = [
  {id:0, totalMonthlyIncome: 822, monthlyRent: 822, usage: 'a commercial use', squareFeet: 302},
  {id:1, totalMonthlyIncome: 890, monthlyRent: 890, usage: 'some commercial use', squareFeet: 61}
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

function render() {
  const totalGross = otherIncomes.concat(commercialIncomes).map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
    total + income,
    0
  );
  console.log('gross other', totalGross);
  ReactDOM.render(
    <div>
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
