/*

*/
import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Pressable} from 'react-native';
import Bookmark from '../components/Bookmark';

const MVAContent = props => {
  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Text style={[styles.heading_1, styles.neutral]}>
          DEV screen name: MVA CONTENT
        </Text>
        <Text style={styles.heading_2}>Heading 2</Text>
        <Bookmark />
        <Text style={[styles.body, styles.accent_1]}>Body</Text>
        <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
      </View>
    </SafeAreaView>
  );
};

export default MVAContent;

