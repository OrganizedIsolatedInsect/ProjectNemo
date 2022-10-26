if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import store from './src/redux/store';

import {colors} from './src/assets/styles';

import {db} from './src/components/Database';

// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);

// Make React Navigation's default theme background color match the rest of the app. This ensures all
// backgrounds are the same color without needing it to be declared in "View Styles"
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundColoring,
  },
};

// const queryForSample = () => {
//   db.transaction(tx => {
//     tx.executeSql('select * from CCSampleData', [], (tx, results) => {
//       let temp = [];
//       for (let i = 0; i < results.rows.length; ++i)
//         temp.push(results.rows.item(i));
//       console.log(temp);
//     });
//   });
// };

const App = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from CCSampleData', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        // setFlatListItems(temp);
        console.log('flatListItems');
      });
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.backgroundColoring}
          barStyle="dark-content"
        />
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
