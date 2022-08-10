//PACKAGE Imports
import React from 'react';
import styles from '../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View, Button, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LandingScreen = props => {
  const navAid = useNavigation();

  return (
    <View style={styles.background}>

      <View>

<View>
  <Ionicons name={'search-outline'} size={30} />
</View>

</View>

      <View style={styles.sectionDivider} />
      <Text style={[styles.heading_1, styles.neutral]}>Dev screen name: LANDING SCREEN</Text>
      <View style={styles.sectionDivider} />
      <View><Pressable onPress={() => navAid.navigate('MVABrowse')}><Text style={styles.heading_2}>Criminal Code of Canada</Text></Pressable></View>
      <View style={styles.sectionDivider} />
      <View><Pressable onPress={() => navAid.navigate('MVABrowse')}><Text style={styles.heading_2}>Motor Vehicle Act / Regulations</Text></Pressable></View>
      <View style={styles.sectionDivider} />
      <Text style={[styles.body, styles.accent_1]}>Body</Text>
      <Text style={[styles.body, styles.accent_2]}>Body 2</Text>

    </View>
  );
};

export default LandingScreen;
