import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import testData from '../data/test.json';
import crimData from '../data/C-46.json';
import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {Item} from 'react-navigation-header-buttons';

/*
component is used in content screens, section is sent as prop and then filtered against the json data to
return data set for paragraphs
*/

const Section = ({section, type}) => {
  const sectionId = section;
  const typeId = type;

  const sectionData = crimData.filter(obj => {
    return obj.section === sectionId;
  });

  //Create array to divide up subsections
  let subsectionArray = [];

  for (var i = 0, l = sectionData.length; i < l; i++) {
    const section = sectionData[i].section;
    const subsection = sectionData[i].subsection;
    const subsectionHeader = sectionData[i].subsectionHeader;
    const subsectionText = sectionData[i].subsectionText;

    const pushArray = (
      section,
      subsection,
      subsectionHeader,
      subsectionText,
    ) => {
      subsectionArray.push({
        section: section,
        subsection: subsection,
        subsectionHeader: subsectionHeader,
        subsectionText: subsectionText,
      });
    };

    if (i === 0) {
      pushArray(section, subsection, subsectionHeader, subsectionText);
    } else {
      const prevSubsection = sectionData[i - 1].subsection;

      if (subsection !== prevSubsection) {
        pushArray(section, subsection, subsectionHeader, subsectionText);
      }
    }
  }

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
    // dispatch based on opposite of flag because marked does not change until the rerender
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

  //bookmark to dispatch redux action to add bookmark
  const SectionHeader = ({section, sectionHeader}) => (
    <View style={{flexDirection: 'row'}}>
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

  const SubsectionHeader = ({subsection, subsectionHeader, subsectionText}) => {
    if (subsectionHeader !== null) {
      return (
        <View>
          <View>
            <Text>
              {subsectionHeader}
              {'\n'}
              {'\n'}
              {subsection} {subsectionText}
            </Text>
          </View>
        </View>
      );
    }
    if (subsectionHeader === null) {
      return (
        <View>
          <View>
            <Text>
              {subsection} {subsectionText}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderItemSubsection = ({item, index}) => {
    let paraData = sectionData.filter(
      (subsection, i) => sectionData[i].subsection === item.subsection,
    );

    //console.log(subParaData);

    //crate array of paragraphs that remove duplications due to having sub paragraphs, send this array as data for flatlist
    const paraFilter = [];

    for (var i = 0, l = paraData.length; i < l; i++) {
      if (i === 0) {
        paraFilter.push(paraData[i]);
      }
      if (i > 0) {
        const prevPara = paraData[i - 1].paragraph;

        if (paraData[i].paragraph !== prevPara) {
          paraFilter.push(paraData[i]);
        }
      }
    }

    return (
      <View>
        <SubsectionHeader
          subsection={item.subsection}
          subsectionHeader={item.subsectionHeader}
          subsectionText={item.subsectionText}
        />
        <View>
          <FlatList data={paraFilter} renderItem={renderItemPara} />
        </View>
      </View>
    );
  };

  const renderItemPara = ({item}) => {
    //console.log(item);

    //filter out data that has sub paragraphs in order to pass to flatlist for sub paragraphs
    let subparaData = sectionData.filter(
      (section, i) =>
        sectionData[i].paragraph === item.paragraph &&
        sectionData[i].paragraphText === item.paragraphText &&
        sectionData[i].subparagraph !== null,
    );

    //console.log(subparaData);

    if (item.paragraph !== null) {
      return (
        <View>
          <Text style={styles.paragraph}>
            {/*  In{item.index} */}
            {item.paragraph} {item.paragraphText}
          </Text>
          <FlatList data={subparaData} renderItem={renderSubPara} />
        </View>
      );
    }
  };

  const renderSubPara = ({item}) => {
    return (
      <View>
        <Text style={styles.subParagraph}>
          {item.subparagraph} {item.subparagraphText}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.CCcontent}>
        <View style={styles.sectionDivider}>
          <SectionHeader
            section={sectionData[0].section}
            sectionHeader={sectionData[0].sectionHeader}
          />
        </View>
        <FlatList data={subsectionArray} renderItem={renderItemSubsection} />
      </View>
    </SafeAreaView>
  );
};

export default Section;
