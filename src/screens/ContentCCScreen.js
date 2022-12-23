import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';

const ContentCCScreen = props => {
  //pull section number from SectionCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.heading2Key;
  let marginalNoteKey = props.route.params.marginalNoteKey;
  let searchResults = props.route.params.searchResults;
  let subsectionKey = props.route.params.subsectionKey;
  let prevScreen = props.route.params.prevScreen;

  let lawType = 'CC';

  return (
    <SafeAreaView>
      <Section
        section={sectionId}
        lawType={lawType}
        marginalNoteKey={marginalNoteKey}
        prevScreen={prevScreen}
      />
      <Section section={sectionId} typeId={lawType} />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
