import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import Bookmark from '../components/Bookmark';
import styles, {colors} from '../assets/styles';

const ContentMVA = ({item}) => {
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
            {item.contravention}
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
          {item.sectionText}
          {'\n'}
        </Text>
        <View style={styles.MVAContentSubsection}>
          <Text
            style={{
              ...styles.MVAContentSectionText,
              color: colors.primaryText,
            }}>
            {item.sectionSubsection}
            {item.sectionParagraph}
            {item.sectionSubparagraph}
            {item.sectionSubLength}
            {'\n'}
          </Text>
        </View>
      </View>

      <View>
        <Text style={{...styles.MVAContentTicket, color: colors.primaryText}}>
          Ticketed Amount: {item.fine} {'\n'}
          Reduced ticket amount ({'<'}30 days): {item.reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContentMVA;
