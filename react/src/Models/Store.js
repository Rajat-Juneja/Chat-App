import {createStore} from 'redux';
import {Reducer} from './Reducer';

export const Store = createStore(Reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());