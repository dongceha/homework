import {combineReducers} from 'redux';
import counterReducer from './counter.reducer';
import networkReducer from './network.reducer'
export default combineReducers({
    counterReducer,
    networkReducer,
});
