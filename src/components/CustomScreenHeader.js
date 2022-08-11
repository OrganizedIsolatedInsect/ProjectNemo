/*
    Header COmponent for every screen which includes 1 consistent title, and 1 Search icon
*/



//SYSTEM Imports
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView} from 'react-native-safe-area-context';
//USER Imports
import styles from '../assets/styles';



const CustomScreenHeader = () => {
    const navAid = useNavigation();
    return (
        <View>
            <Pressable onPress={()=> navAid.navigate('LandingScreen')}><Text style={[styles.title, styles.primary]}>Project Nemo</Text></Pressable>
            <Pressable onPress={()=> navAid.navigate('SearchScreen')}><Icon name={'search'} size={30} /></Pressable>
        </View>


    );
  };

  export default CustomScreenHeader; 