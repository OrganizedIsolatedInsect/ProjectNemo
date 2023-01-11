//PACKAGE Imports
import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//USER IMPORTS
import styles from '../assets/styles';

const SplashScreen = props => {
  const navAid = useNavigation();

  //sets destination once timer is completed
  const destination = () => {
    navAid.navigate('LandingScreen');
  };

  //sets up timer component to be called from return statement
  const GoToLandingScreen = () => {
    setInterval(destination, 3000); // 3000 = 3 seconds.
  };

  /*OUTPUT*/
  return (
    <View style={styles.splashContainer}>
      <View style={styles.splashBackground}>
        <Text style={styles.splashText}>Finding NEMO</Text>
        {<GoToLandingScreen />}
      </View>
    </View>
  );
};

export default SplashScreen;
