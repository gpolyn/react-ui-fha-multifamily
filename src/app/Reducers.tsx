import {ADD_INCOME, DELETE_INCOME} from './ActionTypes';

const initialState = [];

export default function incomes(state = initialState, action) {
  switch (action.type) {
    case ADD_INCOME:
      const someId = state.reduce((maxId, income) => Math.max(income.id, maxId), -1) + 1;
      return [
        Object.assign(action.payload.income, {id: someId}),
        ...state
      ];

    case DELETE_INCOME:
      return state.filter(income =>
        income.id !== action.payload.id
      );

    default:
      return state;
  }
}
