import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';

const ContentCCScreen = props => {
  let lawType = 'CC';

  return (
    <SafeAreaView>
      <Section section={props.route.params.heading2Key} lawType={lawType} />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
