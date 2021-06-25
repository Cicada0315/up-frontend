import { combineReducers } from 'redux';
import postsReducer from './postsReducer';

export const reducers = combineReducers({ postsReducer });