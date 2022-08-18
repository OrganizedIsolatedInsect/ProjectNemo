/*

*/
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Bookmark from '../components/Bookmark';
import styles from '../assets/styles';

function ContentScreen({route}) {
  const {item} = route.params;


  return (
    <View style={styles.background}>
      <View style={styles.sectionDivider} />
      <Text style={[styles.heading_1, styles.neutral]}>
        DEV screen name: MVA CONTENT
      </Text>
      <View style={stylesContent.headingContainer}>
        <View style={stylesContent.headingContainerLeft}>
          <Text style={{...styles.heading_1, fontWeight: 'bold'}}>
            {item.contravention}
          </Text>
        </View>
        <View style={stylesContent.headingContainerRight}>
          <Bookmark />
        </View>
      </View>
      <View style={stylesContent.contentSection}>
        <Text style={styles.accent_1}>
          {item.source}, Section {item.provision}
        </Text>
        <Text style={stylesContent.contentSectionText}>{item.sectionText}</Text>
        <Text></Text>
        <View style={stylesContent.contentSubsection}>
          <Text>{item.sectionSubsection}</Text>
          <Text>{item.sectionParagraph}</Text>
          <Text>{item.sectionSubparagraph}</Text>
          <Text>{item.sectionSubLength}</Text>
        </View>
      </View>

      <View>
        <Text style={stylesContent.contentTicket}>
          Ticketed Amount: {item.fine}
        </Text>
        <Text style={stylesContent.contentTicket}>
          Reduced ticked amount ({'<'}30 days): {item.reducedFine}
        </Text>
      </View>
    </View>
  );
}

const stylesContent = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  headingContainerLeft: {
    flex: 1,
    width: '95%',
  },
  headingContainerRight: {
    alignItems: 'flex-end',
  },
  contentSection: {
    paddingHorizontal: 18,
  },
  contentSectionText: {
    paddingTop: 18
  },
  contentSubsection: {
    paddingHorizontal: 18,

  },
  contentTicket: {
    paddingHorizontal: 18,
    fontWeight: 'bold',
    fontSize: 15
  },
});

export default ContentScreen;
