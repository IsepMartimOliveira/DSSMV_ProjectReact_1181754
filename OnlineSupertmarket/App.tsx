import React from 'react';
import Routes from './routes/Routes';
import {UserProvider} from './context/UserProvider';

const App = () => (
  <UserProvider>
    <Routes />
  </UserProvider>
);

export default App;
