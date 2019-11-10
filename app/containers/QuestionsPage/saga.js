import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  makeSelectQuestionCode,
  makeSelectInputValue
} from './selectors';
import {requestAxios} from 'utils/request';
import { GetResult } from './constants';
import {BASE_URL} from '../../utils/helpers';

export function* fetchResult() {
  const requestURL = `${BASE_URL}/evaluateInput`;
  const questionCode = yield select(makeSelectQuestionCode());
  const inputValue = yield select(makeSelectInputValue());
  var params = {
    questionCode,
    inputValue
  };
  if (questionCode == 'q2') {
    var inputValueCopy = inputValue.split(';');
    var inputValueArray1 = inputValueCopy[0].split(',');
    var inputValueArray2 = inputValueCopy[1].split(',');
    params = {
      questionCode,
      inputValueArray1,
      inputValueArray2
    }
  }
  try {
    const response = yield call(requestAxios, requestURL, params);
    if (response.status == 200) {
      alert(response.data.output);
    }
  } catch(err) {
    console.log(err);
  }
}


export default function* questionCodeSaga() {
  yield takeLatest(GetResult, fetchResult);
}