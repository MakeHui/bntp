import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { initializeListeners } from './actions';
import reducers from './reducers';
import App from './containers/App';

import {
  folderPreferenceRepository,
  themeRepository,
  themePreferenceRepository,
  visibilityRepository,
} from './repositories';

import './index.css';

const initialState = () => {
  const folderPreference = folderPreferenceRepository.get();
  const selectedTheme = themePreferenceRepository.getOrDefault();
  const themes = themeRepository.findAll();
  const visibilities = visibilityRepository.findAll();
  return {
    folderPreference,
    selectedTheme,
    themes,
    visibilities,
  };
};

const store = createStore(
  reducers,
  initialState(),
  applyMiddleware(thunk, createLogger())
);

// Apply theme on the root element
store.subscribe(() => {
  const { selectedTheme } = store.getState();
  document.documentElement.className = `Theme__${selectedTheme.id}`;
});

store.subscribe(() => {
  const { folderPreference, selectedTheme, visibilities } = store.getState();
  folderPreferenceRepository.save(folderPreference);
  themePreferenceRepository.save(selectedTheme);
  visibilityRepository.save(visibilities);
});

store.dispatch(initializeListeners());

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
