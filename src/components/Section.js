import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Pressable, Button, FlatList} from 'react-native';
import Bookmark from '../components/Bookmark';
import testData from '../data/test.json';

const ParagraphItem = ({index, section, paragraph, paragraphText}) => (
  <View>
    <Text style={[styles.body, styles.accent_1]}>
      {paragraph} {paragraphText}
    </Text>
  </View>
);

const SectionHeader = ({index, section, sectionHeader}) => (
  <View>
    <Text style={[styles.heading_2, styles.accent_2]}>
      {section} {sectionHeader}
    </Text>
  </View>
);

const Section = ({data}) => {
  const renderItem = ({item}) => {
    if (item.paragraph !== null) {
      return (
        <View>
          <ParagraphItem
            index={item.index}
            section={item.section}
            paragraph={item.paragraph}
            paragraphText={item.paragraphText}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <View style={styles.sectionDivider}>
          <SectionHeader
            index={data.index}
            section={data.section}
            sectionHeader={data.sectionHeader}
          />
          <Bookmark />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item = item.index)}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Section;
