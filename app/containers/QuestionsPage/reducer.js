/*
 *
 * QuestionsPage reducer
 *
 */
import produce from 'immer';
import { SetInputData, GetResult } from './constants';

export const initialState = {
  inputData1: '',
  inputData2: '',
  inputData3: '',
  inputData4: '',
  questionCode: '',
  inputValue: ''
};

/* eslint-disable default-case, no-param-reassign */
const questionsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SetInputData:
        if (action.questionNumber == 1) {
          draft.inputData1 = action.inputData;
          break;
        } 
        else if (action.questionNumber == 2) {
          draft.inputData2 = action.inputData;
          break;
        } 
        else if (action.questionNumber == 3) {
          draft.inputData3 = action.inputData;
          break;
        } 
        else {
          draft.inputData4 = action.inputData;
          break;
        } 

      case GetResult:
        if (action.questionNumber == 1) {
          draft.questionCode = 'q1';
          draft.inputValue = draft.inputData1;
          break;
        } 
        else if (action.questionNumber == 2) {
          draft.questionCode = 'q2';
          draft.inputValue = draft.inputData2;
          break;
        } 
        else if (action.questionNumber == '3c') {
          draft.questionCode = 'q3Compress';
          draft.inputValue = draft.inputData3;
          break;
        } 
        else if (action.questionNumber == '3d') {
          draft.questionCode = 'q3Decompress';
          draft.inputValue = draft.inputData3;
          break;
        } 
        else {
          draft.questionCode = 'q4';
          draft.inputValue = draft.inputData4;
          break;
        } 
    }
  });

export default questionsPageReducer;
