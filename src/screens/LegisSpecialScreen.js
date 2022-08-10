
/**
 * 
 *  This screen is built for those cases where the regular screens do not apply.  Example in case of additional Fines for MVA section.
 */

import React from 'react';
import styles from '../assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text, View} from 'react-native';


const LegisSpecialScreen = () => {
  return (
    <View style={styles.background}>
      <Text style={[styles.title, styles.secondary]}>Project Nemo</Text>
      <Text style={[styles.heading_1, styles.neutral]}>Heading 1</Text>
      <Text style={styles.heading_2}>Heading 2</Text>
      <Text style={[styles.body, styles.accent_1]}>Body</Text>
      <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
      <Ionicons name={'bookmark'} size={30} />
      <Ionicons name={'bookmark-outline'} size={30} />
      <Ionicons name={'book'} size={30} />
      <Ionicons name={'book-outline'} size={30} />
    </View>
  );
};

export default LegisSpecialScreen;
