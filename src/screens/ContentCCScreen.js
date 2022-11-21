/*

*/
import React from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native';

import Section from '../components/Section';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component

  let sectionId = props.route.params.passingKey;

  let lawType = 'crim code'; //TODO  should change this to "CC"

  return (
    <SafeAreaView>
      <View>
        <Text
          style={[
            styles.title,
            styles.titleMargin,
            {color: colors.primaryText},
          ]}>
          CRIMINAL CODE OF CANADA
        </Text>
      </View>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Section section={sectionId} typeId={lawType} />
      </View>
    </SafeAreaView>
  );
};

export default ContentCCScreen;
