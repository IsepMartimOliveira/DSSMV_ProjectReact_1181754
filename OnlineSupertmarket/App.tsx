import React from 'react';
import Routes from './routes/Routes';
import {UserProvider} from './context/UserProvider';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import store from './reducer/store';
const App = () => (
  <Provider store={store}>
    <UserProvider>
      <Routes />
    </UserProvider>
  </Provider>
);

export default App;
