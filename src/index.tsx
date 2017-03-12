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

function onSave(something: any) { console.log('onSaveFromIndex', something); };
function onDestroy(id: any) { console.log('onDestroy', id); };

function deleteOtherIncome(id: any) {
  console.log('deleteOtherIncome', id)
  otherIncomes = incomes(otherIncomes, actions.deleteIncome(id));
  render();
};

function addOtherIncome(income: any) {
  console.log('addOtherIncome', income)
  otherIncomes = incomes(otherIncomes, actions.addIncome(income));
  render();
};

const root = document.getElementById('root')

function render() {
  ReactDOM.render(
    <OtherIncome
     incomes={otherIncomes}
     // onDestroy={onDestroy}
     onDestroy={deleteOtherIncome}
     // onSave={onSave}
     onSave={addOtherIncome}
     />,
     root
  );
}

render();
