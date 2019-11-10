import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the questionsPage state domain
 */

const selectQuestions = state => state.questionsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by QuestionsPage
 */

const makeSelectQuestionsPage = () =>
  createSelector(
    selectQuestions,
    substate => substate,
  );

const makeSelectInputData1 = () =>
  createSelector(
    selectQuestions,
    questionState => questionState.inputData1,
  );

const makeSelectInputData2 = () =>
  createSelector(
    selectQuestions,
    questionState => questionState.inputData2,
  );

const makeSelectInputData3 = () =>
  createSelector(
    selectQuestions,
    questionState => questionState.inputData3,
  );

const makeSelectInputData4 = () =>
  createSelector(
    selectQuestions,
    questionState => questionState.inputData4,
  );

const makeSelectQuestionCode = () => 
    createSelector(
      selectQuestions,
      questionState => questionState.questionCode
    );

const makeSelectInputValue = () =>
      createSelector(
        selectQuestions,
        questionState => questionState.inputValue
      );

export default makeSelectQuestionsPage;
export { 
  selectQuestions,
  makeSelectInputData1,
  makeSelectInputData2,
  makeSelectInputData3,
  makeSelectInputData4,
  makeSelectQuestionCode,
  makeSelectInputValue
 };
