/**
 *
 *  This screen is built for those cases where the regular screens do not apply.  Example in case of additional Fines for MVA section.
 */

import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Pressable} from 'react-native';
//USER Imports

const ExceptionScreen = props => {
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Text style={[styles.heading_1, styles.neutral]}>
          Dev screen name: EXCEPTION SCREEN
        </Text>
        <Text style={styles.heading_2}>Heading 2</Text>
        <Text style={[styles.body, styles.accent_1]}>Body</Text>
        <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
      </View>
    </SafeAreaView>
  );
};

//TODO take row 16 SEARCH and replace with a textbox and search icon

export default ExceptionScreen;
