import React, {useState, useEffect} from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {db} from './Database';
import {useIsFocused} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';
import SQLite from 'react-native-sqlite-storage';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {Item} from 'react-navigation-header-buttons';

import {FlashList} from '@shopify/flash-list';

/*
component is used in content screens, section is sent as prop and then filtered against the json data to
return data set for paragraphs
*/

const Section = ({section, type}) => {
  const window = useWindowDimensions();

  //section prop passed on from browse screen
  const sectionId = section;
  const typeId = type;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //set states for bookmark flag, database data, loading
  const [marked, setMarked] = useState(false);
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(false);

  //pull state to see if current section exists in bookmarks
  const bookmarkStateId = useSelector(state => state.bookmarks.sections);

  //used to switch the bookmark icon from outline to fill and vice versa
  const switchMarks = () => {
    setMarked(!marked);
  };

  //Create array to divide up subsections
  let subsectionArray = [];

  useEffect(() => {
    getDbData(sectionId);
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (bookmarkStateId.some(e => e.section == section)) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [marked, isFocused]);

  // function to get data from NemoDB
  const getDbData = sectionId => {
    db.transaction(tx => {
      tx.executeSql(
        'Select * from CrimCode where section = ?',
        // 'Select * from CCSampleData where section = ?',
        [sectionId],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDbData(temp);
          setLoading(true);
        },
      );
    });
  };

  for (var i = 0, l = dbData.length; i < l; i++) {
    const section = dbData[i].section;
    const subsection = dbData[i].subsection;
    const subsectionHeader = dbData[i].subsectionHeader;
    const subsectionText = dbData[i].subsectionText;

    //function to push subsections into subsectionArray
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
      const prevSubsection = dbData[i - 1].subsection;

      if (subsection !== prevSubsection) {
        pushArray(section, subsection, subsectionHeader, subsectionText);
      }
    }
  }

  //dispatch add or remove bookmarks based bookmark icon
  //lawtype line required to differentiate in case of duplicate Section values.
  const dispatchAction = (section, sectionHeader) => {
    // dispatch based on opposite of flag because marked does not change until the rerender
    if (marked === false) {
      dispatch(
        addBookmark({
          section: section,
          sectionHeader: sectionHeader,
          lawtype: 'CC',
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          section: section,
          lawtype: 'CC',
        }),
      );
    }
  };

  //bookmark to dispatch redux action to add bookmark
  // ONPRESS requires the LawType because when the Bookmark is clicked, that field must be passed into the redux
  const SectionHeader = ({section, sectionHeader}) => (
    <View style={styles.gridListItem}>
      <Text style={{...styles.title, color: colors.primaryText}}>
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
        style={{color: colors.primary}}
      />
    </View>
  );

  const SubsectionHeader = ({subsection, subsectionHeader, subsectionText}) => {
    if (subsectionHeader !== null) {
      return (
        <View>
          <View>
            <Text style={{...styles.body, color: colors.primaryText}}>
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
            <Text style={{...styles.body, color: colors.primaryText}}>
              {subsection} {subsectionText}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderItemSubsection = ({item, index}) => {
    let paraData = dbData.filter(
      (subsection, i) => dbData[i].subsection === item.subsection,
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
        <View style={{height: 2, width: window.width}}>
          <FlashList
            data={paraFilter}
            renderItem={renderItemPara}
            estimatedItemSize={79}
          />
        </View>
      </View>
    );
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

  const renderItemPara = ({item}) => {
    //console.log(item);

    //filter out data that has sub paragraphs in order to pass to flatlist for sub paragraphs
    let subparaData = dbData.filter(
      (section, i) =>
        dbData[i].paragraph === item.paragraph &&
        dbData[i].paragraphText === item.paragraphText &&
        dbData[i].subparagraph !== null,
    );

    //console.log(subparaData);

    if (item.paragraph !== null) {
      return (
        <View style={{height: 200}}>
          <Text
            style={{
              ...styles.paragraph,
              ...styles.body,
              color: colors.primaryText,
            }}>
            {/*  In{item.index} */}
            {item.paragraph} {item.paragraphText}
          </Text>
          <FlashList
            data={subparaData}
            renderItem={renderSubPara}
            estimatedItemSize={79}
          />
        </View>
      );
    }
  };

  if (loading === true) {
    return (
      <SafeAreaView>
        <View style={styles.CCcontent}>
          <View>
            <SectionHeader
              section={dbData[0].section}
              sectionHeader={dbData[0].sectionHeader}
            />
          </View>
          <FlashList
            data={subsectionArray}
            renderItem={renderItemSubsection}
            estimatedItemSize={79}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default Section;
