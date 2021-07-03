import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import authReduceer from './authReducer';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReduceer,
})

export default createRootReducer;