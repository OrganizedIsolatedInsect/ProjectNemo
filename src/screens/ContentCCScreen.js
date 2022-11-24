import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';

import {PrintTitle} from '../components/PrintTitle';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.passingKey;

  // Define props for PrintTitle component. Props are passed from CrimCodeGridList.js
  let pagePartTitle = props.route.params.heading1Label; // Part II
  let pagePartLabel = props.route.params.heading1TitleText; // Offences Against Public Order
  let pagePartHeadingTitle = props.route.params.heading2TitleText; // Sedition

  let lawType = 'crim code'; //TODO  should change this to "CC"

  return (
    <SafeAreaView>
      <PrintTitle
        pageTitle="Criminal Code of Canada"
        pagePartTitle={pagePartTitle}
        pagePartLabel={pagePartLabel}
        pagePartHeadingTitle={pagePartHeadingTitle}
      />
      <Section section={sectionId} typeId={lawType} />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
