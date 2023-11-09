import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { rootReducer } from '../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

export const testStore = (state) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: state,
  });
};

export const renderWithStore = (component, initialState) => {
  const Wrapper = ({ children }) => (
    <Provider store={testStore(initialState)}>
      <Router>{children}</Router>
    </Provider>
  );
  return render(component, { wrapper: Wrapper });
};

export function componentWrapper(children, initialState) {
  return (
    <Provider store={testStore(initialState)}>
      <Router>{children}</Router>
    </Provider>
  );
}
