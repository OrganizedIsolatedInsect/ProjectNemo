import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//USER IMPORTS
import styles from '../assets/styles';
import {color} from 'react-native-reanimated';

const LaunchScreen = props => {
  const navAid = useNavigation();

  setTimeout(() => {
    navAid.navigate('AppNavigator', {screen: 'LandingScreen'});
  }, 3000);

  return (
    <View>
      <Text
        style={{textAlign: 'center', top: 300, fontSize: 35, color: 'grey'}}>
        FINDING <Text style={{color: 'white'}}>NEMO</Text>
      </Text>
    </View>
  );
};

export default LaunchScreen;
