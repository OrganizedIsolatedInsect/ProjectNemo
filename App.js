import React, {useState, useEffect} from 'react';
import {StatusBar, View, Image} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
//USER Imports
import AppNavigator from './src/navigation/TabNavigation';
import store from './src/redux/store';

import styles, {colors} from './src/assets/styles.js';

// TODO - DEV tool only - remove upon production
let date = new Date();
console.log(date);

// Make React Navigation's default theme background color match the rest of the app
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundColoring,
  },
};

const App = () => {
  // Splash screen https://stackoverflow.com/questions/61040763/how-to-create-splash-screen-inside-react-navigation-without-using-any-other-libr

  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 1800);
  }, []);

  return splash ? (
    <View>
      <Image
        resizeMode={'cover'}
        style={styles.splashImage}
        source={require('./src/assets/splash.png')}
      />
    </View>
  ) : (
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

  // return (
  //   <Provider store={store}>
  //     <SafeAreaProvider>
  //       <StatusBar
  //         backgroundColor={colors.backgroundColoring}
  //         barStyle="dark-content"
  //       />
  //       <NavigationContainer theme={navTheme}>
  //         <AppNavigator />
  //       </NavigationContainer>
  //     </SafeAreaProvider>
  //   </Provider>
  // );
};

export default App;

//TO DO

//Remove all TO DO Comments
//remove consolelogs
//remove all DEV Notes
//Remove flatlist dummy data on screens.  Or create dummy data component
