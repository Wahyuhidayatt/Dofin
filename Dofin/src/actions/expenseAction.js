import * as ActionTypes from './constants';
import axios from 'axios'
const host = 'http://dofin-backend-dev.us-west-2.elasticbeanstalk.com'

function isError(data) {
  return data.hasOwnProperty('errors') ? true : false
}

export const postExpense = data => ({
  type: ActionTypes.ADD_EXPENSE,
  payload: data,
});

export const getTotalExpenseAmountByMonth = data => ({
  type: ActionTypes.GET_EXPENSE_AMOUNT_BY_MOUNT,
  payload: data,
});

export const getExpenseById = data => ({
  type: ActionTypes.GET_EXPENSE_BY_ID,
  payload: data,
});

export const expenseRequestFail = data => ({
  type: 'ADD_EXPENSE_FAIL',
  payload: data,
});

export const expenseRequestSuccess = data => ({
  type: 'ADD_EXPENSE_SUCCESS',
  payload: data,
});

export const resetErrorMessage = () => ({
  type: 'RESET_ERROR_MESSAGE',
  payload: '',
});

export const resetSuccessMessage = () => ({
  type: 'RESET_SUCCESS_MESSAGE',
  payload: '',
});

export const expenseRequest = data => {
  return dispatch =>
    axios.post(host + '/expenses', {
      record_by   : data.record_by,
      amount      : data.amount,
      description : data.description,
      items       : data.items,
      category    : data.category,
      date        : data.date,
      location    : data.location,
    }, { timeout: 7000 })
    .then(response => {
      // console.log(response.data)
      return isError(response.data) ?
        dispatch(expenseRequestFail(err)) :
        dispatch(expenseRequestSuccess(response.data))
    })
    .catch(err => {
      // console.log(err)
      return dispatch(expenseRequestFail(err))
    })
};

export const getExpenseTotalByMonthRequest = () => {
  return {
    type: 'RESET_ERROR_MESSAGE',
    payload: '',
  }
  // return dispatch =>
  //   axios.get('http://192.168.0.209:8080/expenses/59169da29a208a785ad2e99c/total_amount_by_month')
  //   .then(response => dispatch(getTotalExpenseAmountByMonth(response.data)))
  //   .catch(err => console.log(err.message))
};

export const getExpenseRequestById = () => {
  return dispatch =>
    axios.get('http://192.168.0.209:8080/expenses/59169da29a208a785ad2e99c')
    .then(response => dispatch(getExpenseById(response.data)))
    .catch(err => console.log(err.message))
};
