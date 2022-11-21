import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

import Section from '../components/Section';

import {PrintTitle} from '../components/PrintTitle';

const ContentCCScreen = props => {
  //pull section number from BrowseCCScreen or BookmarkScreen to send to section component
  let sectionId = props.route.params.passingKey;

  // let pagePartTitle = props.route.params.pagePartTitle;
  // let pagePartLabel = props.route.params.pagePartLabel;
  // let pagePartHeadingTitle = props.route.params.pagePartHeadingTitle;

  console.log('ContentCCScreen', sectionId);

  // let pagePartTitle = 'props.pagePartTitle';
  // let pagePartLabel = 'props.pagePartLabel';
  // let pagePartHeadingTitle = 'props.pagePartHeadingTitle';

  let pagePartTitle = pagePartTitle;
  let pagePartLabel = 'props.pagePartLabel';
  let pagePartHeadingTitle = 'props.pagePartHeadingTitle';

  let lawType = 'crim code'; //TODO  should change this to "CC"

  return (
    <SafeAreaView>
      <PrintTitle
        pagePartTitle={pagePartTitle}
        pagePartLabel={pagePartLabel}
        pagePartHeadingTitle={pagePartHeadingTitle}
      />
      <Section section={sectionId} typeId={lawType} />
    </SafeAreaView>
  );
};

export default ContentCCScreen;
