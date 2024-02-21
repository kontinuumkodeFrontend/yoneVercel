import { combineReducers } from 'redux';
import { commonReducer } from './commonReducer';

const rootReducer = combineReducers({
  commonReducer:commonReducer
});

export default rootReducer;