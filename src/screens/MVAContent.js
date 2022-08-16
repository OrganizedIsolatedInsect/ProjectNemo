/*

*/
import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import testData from '../data/test.json';
import Section from '../components/Section';
import crimData from '../data/C-46.json';

const MVAContent = props => {
  //pull section number from browse screen to send to section component
  let sectionId = props.route.params.section;

  let typeId = 'crim code';

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.sectionDivider} />
        <Section section={sectionId} typeId={typeId} />
      </View>
    </SafeAreaView>
  );
};

export default MVAContent;
