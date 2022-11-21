import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';


// TO DO PrintTitle should sit on this screen, not the Section.js file
import {PrintTitle} from '../components/PrintTitle';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.passingKey;

  let lawType = 'crim code'; //TODO  should change this to "CC"

  return (
    <SafeAreaView>
      {/* <PrintTitle
        pageTitle="Criminal Code of Canada"
        pagePartTitle={pagePartTitle}
        pagePartLabel={pagePartLabel}
        pagePartHeadingTitle={pagePartHeadingTitle}
      /> */}
      <Section section={sectionId} typeId={lawType} />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
