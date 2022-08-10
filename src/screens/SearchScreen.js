/*
 * Search Screen including Results
 */

import React from 'react';
import styles from '../assets/styles';
import {Text, View, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = props => {
  //VARIABLE SETUP
  const navAid = useNavigation();
  //

  return (
    <SafeAreaView>
    <View style={styles.background}>


      <View style={styles.sectionDivider} />
      <Text style={[styles.heading_1, styles.neutral]}>
        Dev screen name: SEARCH SCREEN - ALL CONTENT
      </Text>
      <Text style={styles.heading_2}>Heading 2</Text>
      <Text style={[styles.body, styles.accent_1]}>Body</Text>
      <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
      <Ionicons name={'bookmark'} size={30} />
      <Ionicons name={'bookmark-outline'} size={30} />
      <Ionicons name={'book'} size={30} />
      <Ionicons name={'book-outline'} size={30} />
    </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
