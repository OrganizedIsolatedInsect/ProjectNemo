/*
 * Search Screen including Results
 */

import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';

const SearchScreen = props => {
  const navAid = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
      <SearchBar />
    </SafeAreaView>
  );
};

export default SearchScreen;
