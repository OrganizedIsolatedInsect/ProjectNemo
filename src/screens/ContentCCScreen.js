import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import Section from '../components/Section';

import {PrintTitle} from '../components/PrintTitle';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.passingKey;
  let searchResults = props.route.params.searchResults;
  let subsectionKey = props.route.params.subsectionKey;

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
      <Section
        sectionId={sectionId}
        typeId={lawType}
        searchResults={searchResults}
        subsectionKey={subsectionKey}
      />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
