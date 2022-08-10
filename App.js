import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppNavigator} from './src/navigation/navigator';

import SearchBar from './src/components/SearchBar';

const App = () => {
  return (
    // <NavigationContainer>
    //   <AppNavigator />
    //   {/* <SearchBar /> */}
    // </NavigationContainer>
    <View>
      <SearchBar />
    </View>
  );
};

export default App;
