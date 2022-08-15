/*

*/
import React from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  View,
  Pressable,
  Button,
  FlatList,
  SectionList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Bookmark from '../components/Bookmark';
import testData from '../data/test.json';
import Section from '../components/Section';
import {addBookmark} from '../redux/bookmarkSlice';

const MVAContent = props => {
  const dispatch = useDispatch();

  const testButton = () => {
    console.log(testData.sectionHeader);
  };

  const ParagraphItem = ({index, section, paragraph, paragraphText}) => (
    <View>
      <Text style={[styles.body, styles.accent_1]}>
        {paragraph} {paragraphText}
      </Text>
    </View>
  );

  const SectionHeader = ({index, section, sectionHeader}) => (
    <View style={styles.sectionDivider}>
      <Text style={[styles.heading_2, styles.accent_2]}>
        {section} {sectionHeader}
      </Text>
      <Icon
        name="bookmark"
        size={30}
        onPress={() => {
          dispatch(
            addBookmark({
              index: index,
              section: section,
              sectionHeader: sectionHeader,
            }),
          );
        }}
      />
    </View>
  );

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
        <View style={styles.sectionDivider} />

        <SectionHeader
          index={testData[3].index}
          section={testData[3].section}
          sectionHeader={testData[3].sectionHeader}
        />
        <View>
          <FlatList data={testData} renderItem={renderItem} />
        </View>
        <Button title="console log" onPress={() => testButton()} />
      </View>
    </SafeAreaView>
  );
};

export default MVAContent;
