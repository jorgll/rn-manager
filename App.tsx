import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import reducers from './src/reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './src/router';

export class AppState {
  auth?: { 
    email: string,
    password: string,
    user: any,
    error: string,
    loading: boolean
  };
  employeeForm?: {
    name: string,
    phone: string,
    shift: string
  };
  employees?: any;
}

export default class App extends React.Component<{}> {

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBLtgVAx-ZXCjIjeic5SgalzILow0kPdF4",
      authDomain: "udemy-rn-manager-1a3c0.firebaseapp.com",
      databaseURL: "https://udemy-rn-manager-1a3c0.firebaseio.com",
      projectId: "udemy-rn-manager-1a3c0",
      storageBucket: "udemy-rn-manager-1a3c0.appspot.com",
      messagingSenderId: "937849557380"
    };
    firebase.initializeApp(config);
  }
  
  render() {
    const store = createStore(reducers, devToolsEnhancer(), applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
