import * as types from './ActionTypes'

export function addIncome(income) {
  return {type: types.ADD_INCOME, payload: {income: income}};
}

export function deleteIncome(id) {
  return {type: types.DELETE_INCOME, payload: {id: id}};
}
