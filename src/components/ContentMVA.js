import React from 'react';
import {Text, View, ScrollView} from 'react-native';

import Bookmark from '../components/Bookmark';
import styles, {colors} from '../assets/styles';

const ContentMVA=({item}) =>{
  return (
    <ScrollView style={styles.background}>
      <View style={styles.MVAContentHeadingContainer}>
        <View style={styles.MVAContentHeadingContainerLeft}>
          <Text style={{...styles.heading_1, fontWeight: 'bold'}}>
            {item.contravention}
          </Text>
        </View>
        <View style={styles.MVAContentHeadingContainerRight}>
          <Bookmark />
        </View>
      </View>
      <View style={styles.MVAContentSection}>
        <Text style={styles.accent_1}>
          {item.source}, Section {item.provision}
        </Text>
        <Text style={styles.MVAContentSectionText}>
          {item.sectionText}
          {'\n'}
        </Text>
        <View style={styles.MVAContentSubsection}>
          <Text>{item.sectionSubsection}</Text>
          <Text>{item.sectionParagraph}</Text>
          <Text>{item.sectionSubparagraph}</Text>
          <Text>{item.sectionSubLength}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.MVAContentTicket}>
          Ticketed Amount: {item.fine}
        </Text>
        <Text style={styles.MVAContentTicket}>
          Reduced ticket amount ({'<'}30 days): {item.reducedFine}
        </Text>
      </View>
    </ScrollView>
  );
}

export default ContentMVA;
