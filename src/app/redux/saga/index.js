import { all } from 'redux-saga/effects';
// import your individual sagas here
// For example:
// import { watchIncrement } from './counterSaga';

export default function* rootSaga() {
  yield all([
    // Put all your individual sagas here
    // For example:
    // watchIncrement(),
  ]);
}