import {defaultStyles, defaultTitle} from '../constants';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
  stylesState: {},
}

function normalize(state) {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  }
}

export function normalizeInitialState(state) {
  return state
    ? normalize(state)
    : JSON.parse(
        JSON.stringify({...defaultState, openedDate: new Date().toJSON()}))
}
