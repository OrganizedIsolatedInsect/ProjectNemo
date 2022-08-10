//PACKAGE Imports
import React from 'react';
import styles from '../assets/styles';
import {Text, View, Button, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LandingScreen = props => {
  const navAid = useNavigation();

  return (
    <SafeAreaView>
    <View style={styles.background}>


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
    </SafeAreaView>
  );
};

export default LandingScreen;
