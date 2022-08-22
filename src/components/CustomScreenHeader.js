/*
    Header COmponent for every screen which includes 1 consistent title, and 1 Search icon
*/



//SYSTEM Imports
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

//USER Imports
import styles from '../assets/styles';
import { colors } from '../assets/styles';



//Sets up Screen header with title and search button, both which have a navigation component
const CustomScreenHeader = () => {
    const navAid = useNavigation();
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={()=> navAid.navigate('LandingScreen')}><Text style={[styles.title, {color: colors.primary}]}>Project Nemo</Text></Pressable>
            <View><Text>       </Text></View>
            <Pressable onPress={()=> navAid.navigate('SearchScreen')}><Icon name={'search'} size={30} /></Pressable>
        </View>


    );
  };

  export default CustomScreenHeader; 
