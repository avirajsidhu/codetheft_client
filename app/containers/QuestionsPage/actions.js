/*
 *
 * QuestionsPage actions
 *
 */

import { SetInputData, GetResult } from './constants';

export function setInputData(questionNumber, inputData) {
  return {
    type: SetInputData,
    questionNumber,
    inputData
  };
}

export function getResult(questionNumber) {
  return {
    type: GetResult,
    questionNumber
  }
}
