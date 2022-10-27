/*

*/
import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, useWindowDimensions, Text} from 'react-native';

import testData from '../data/test.json';
import Section from '../components/Section';
import crimData from '../data/C-46.json';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.section;

  let lawType = 'crim code'; //TODO  should change this to "CC"

  const window = useWindowDimensions();

  return (
    <SafeAreaView>
      <Text>{`Window Dimensions: height - ${window.height}, width - ${window.width}`}</Text>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Section section={sectionId} typeId={lawType} />
      </View>
    </SafeAreaView>
  );
};

export default ContentCCScreen;
