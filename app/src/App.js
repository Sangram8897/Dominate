import React from 'react';
import {View, Text} from 'react-native';
import Gradientview from '../UI/reusables/Gradientview';
import Auth from 'components/auth';

const App = () => {
  return (
    <Gradientview>
      <Auth></Auth>
    </Gradientview>
  );
};

export default App;
