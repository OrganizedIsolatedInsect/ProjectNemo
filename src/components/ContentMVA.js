import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import Bookmark from '../components/Bookmark';
import styles, {colors} from '../assets/styles';

import HighlightText from '@sanar/react-native-highlight-text';

const ContentMVA = ({item, query}) => {
  // prettier-ignore
  const highlightedBodyText = `${item.sectionSubsection === null ? '' : item.sectionSubsection}${'\n'}${item.sectionParagraph === null ? '' : item.sectionParagraph}${'\n'}${item.sectionSubparagraph === null ? '' : item.sectionSubparagraph}${'\n'}`;

  return (
    <ScrollView style={styles.background}>
      <View style={styles.MVAContentHeadingContainer}>
        <View style={styles.MVAContentHeadingContainerLeft}>
          <Text
            style={{
              ...styles.heading_1,
              fontWeight: 'bold',
              color: colors.primaryText,
            }}>
            <HighlightText
              searchWords={[query]}
              textToHighlight={item.contravention}
              highlightStyle={styles.searchResultsHighlight}
            />
            {/* {item.contravention} */}
          </Text>
        </View>
        <View style={styles.MVAContentHeadingContainerRight}>
          <Bookmark />
        </View>
      </View>
      <View style={styles.MVAContentSection}>
        <Text style={{...styles.accent_1, color: colors.primaryText}}>
          {item.source}, Section {item.provision}
        </Text>
        <Text
          style={{...styles.MVAContentSectionText, color: colors.primaryText}}>
          <HighlightText
            searchWords={[query]}
            textToHighlight={item.sectionText}
            highlightStyle={styles.searchResultsHighlight}
          />
          {'\n'}
        </Text>
        <View style={styles.MVAContentSubsection}>
          <Text
            style={{
              ...styles.MVAContentSectionText,
              color: colors.primaryText,
            }}>
            <HighlightText
              searchWords={[query]}
              textToHighlight={highlightedBodyText}
              highlightStyle={styles.searchResultsHighlight}
            />
            {/* {item.sectionSubsection}
            {item.sectionParagraph}
            {item.sectionSubparagraph}
            {item.sectionSubLength} */}
            {'\n'}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{...styles.MVAContentTicket, color: colors.primaryText}}>
          Ticketed amount: {item.fine} {'\n'}
          Reduced ticket amount ({'<'}30 days): {item.reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContentMVA;
