import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';

const ContentCCScreen = props => {
  let lawType = 'CC';

  return (
    <SafeAreaView>
      <Section
        sectionId={props.route.params.heading2Key}
        marginalNoteKey={props.route.params.marginalNoteKey}
        lawType={lawType}
      />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
