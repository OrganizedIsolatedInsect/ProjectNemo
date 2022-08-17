import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import testData from '../data/test.json';
import crimData from '../data/C-46.json';
import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';

/*
component is used in content screens, section is sent as prop and then filtered against the json data to
return data set for paragraphs
*/

const Section = ({section, type}) => {
  const sectionId = section;
  const typeId = type;

  const sectionData = testData.filter(obj => {
    return obj.section === sectionId;
  });

  const dispatch = useDispatch();
  const [marked, setMarked] = useState(false);

  //pull state to see if current section exists in bookmarks
  const bookmarkStateId = useSelector(state => state.bookmarks.sections);

  const switchMarks = () => {
    setMarked(!marked);
  };

  useEffect(() => {
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (bookmarkStateId.some(e => e.section === section)) {
      setMarked(true);
    }
  }, [marked]);

  //dispatch add or remove bookmarks based bookmark icon
  const dispatchAction = (section, sectionHeader) => {
    if (marked === false) {
      dispatch(
        addBookmark({
          section: section,
          sectionHeader: sectionHeader,
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          section: section,
        }),
      );
    }
  };

  const ParagraphItem = ({section, paragraph, paragraphText}) => (
    <View>
      <Text style={[styles.body, styles.accent_1]}>
        {paragraph} {paragraphText}
      </Text>
    </View>
  );

  //bookmark to dispatch redux action to add bookmark
  const SectionHeader = ({section, sectionHeader}) => (
    <View style={styles.sectionDivider}>
      <Text style={[styles.heading_2, styles.accent_2]}>
        {section} {sectionHeader}
      </Text>
      {/* <Bookmark section={section} sectionHeader={sectionHeader} /> */}
      <Icon
        name={marked ? 'bookmark' : 'bookmark-outline'}
        size={30}
        onPress={() => {
          switchMarks();
          dispatchAction(section, sectionHeader);
        }}
      />
    </View>
  );

  const renderItem = ({item}) => {
    if (item.paragraph !== null) {
      return (
        <View>
          <ParagraphItem
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
            section={sectionData[0].section}
            sectionHeader={sectionData[0].sectionHeader}
          />
        </View>
        <FlatList data={sectionData} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Section;
