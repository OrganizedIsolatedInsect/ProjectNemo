import React, {useState, useEffect} from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, VirtualizedList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {db} from './Database';
import {useIsFocused} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';
import SQLite from 'react-native-sqlite-storage';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {Item} from 'react-navigation-header-buttons';

/*
component is used in content screens, section is sent as prop and then filtered against the json data to
return data set for paragraphs
*/

const Section = ({section, type}) => {
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
        'Select * from CCDataV2 where headingkey = ?',
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
    const field1 = dbData[i].field1; // index
    const sectionLabel = dbData[i].sectionlabel; // section
    const subsectionLabel = dbData[i].subsectionlabel; // subsection
    const marginalNote = dbData[i].marginalnote; // sebsectionHeader
    const subsectionText = dbData[i].subsectiontext; // subsectionText
    const sectionKey = dbData[i].sectionkey;
    const subsectionKey = dbData[i].subsectionkey;

    //function to push subsections into subsectionArray
    /* eslint-disable */
    const pushArray = (
      field1,
      sectionLabel,
      subsectionLabel,
      marginalNote,
      subsectionText,
      sectionKey,
      subsectionKey,
    ) => {
      subsectionArray.push({
        field1: field1,
        sectionLabel: sectionLabel,
        subsectionLabel: subsectionLabel,
        marginalNote: marginalNote,
        subsectionText: subsectionText,
        sectionKey: sectionKey,
        subsectionKey: subsectionKey,
      });
    };
    /* eslint-enable */
    if (i === 0) {
      pushArray(
        field1,
        sectionLabel,
        subsectionLabel,
        marginalNote,
        subsectionText,
        sectionKey,
        subsectionKey,
      );
    } else {
      const prevSubsection = dbData[i - 1].subsectionlabel;
      if (subsectionLabel !== prevSubsection) {
        pushArray(
          field1,
          sectionLabel,
          subsectionLabel,
          marginalNote,
          subsectionText,
          sectionKey,
          subsectionKey,
        );
      }
    }
  }

  const getItem = (data, index) => {
    return data[index];
  };

  const renderAccordion = ({item, index}) => {
    let paraData = dbData.filter(
      (paragraph, i) => dbData[i].subsectionkey == item.subsectionKey,
    );

    const paraFilter = [];

    for (var i = 0, l = paraData.length; i < l; i++) {
      if (i === 0) {
        paraFilter.push(paraData[i]);
      }
      if (i > 0) {
        const prevPara = paraData[i - 1].paragraphText;

        if (paraData[i].paragraph !== prevPara) {
          paraFilter.push(paraData[i]);
        }
      }
    }
    return (
      <View>
        <Collapse>
          <CollapseHeader>
            <View style={styles.accordionContainerHeader}>
              <Text>
                {index == 0 && <Text>{item.sectionLabel}</Text>}

                {item.subsectionLabel}
                {item.marginalNote}
              </Text>
              <Icon name="keyboard-arrow-right" size={20} />
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.accordionContainer}>
            <View>
              <Text>
                {item.subsectionText}
                {'\n'}
                {item.subsectionlabel} {item.subsectiontext}
              </Text>
              <FlatList
                data={paraFilter}
                keyExtractor={item => item.field1}
                listKey={(item2, index) => 'B' + index.toString()}
                renderItem={renderParagraph}
              />
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    );
  };

  const renderParagraph = ({item, index}) => {
    let subParaData = dbData.filter(
      (subParagraph, i) =>
        dbData[i].paragraphLabel === item.paragraphLabel &&
        dbData[i].paragraphText === item.paragraphText &&
        dbData[i].subparagraphText !== null,
    );

    return (
      <View>
        <Text>
          {item.paragraphLabel} {item.paragraphText}
          {'\n'}
        </Text>
        <FlatList
          data={subParaData}
          keyExtractor={item => item.field1}
          listKey={(item3, index) => 'C' + index.toString()}
          renderItem={renderSubParagraph}
        />
      </View>
    );
  };

  const renderSubParagraph = ({item, index}) => {
    return (
      <View>
        <Text>
          {item.subparagraphLabel} {item.subparagraphText}
        </Text>
      </View>
    );
  };
  //dispatch add or remove bookmarks based bookmark icon
  //lawtype line required to differentiate in case of duplicate Section values.
  const dispatchAction = (section, sectionHeader) => {
    // dispatch based on opposite of flag because marked does not change until the rerender
    if (marked === false) {
      dispatch(
        addBookmark({
          sectionLabel: sectionLabel,
          sectionHeader: sectionHeader,
          lawtype: 'CC',
        }),
      );
    }
    if (marked === true) {
      dispatch(
        removeBookmark({
          sectionLabel: sectionLabel,
          lawtype: 'CC',
        }),
      );
    }
  };

  if (loading === true) {
    return (
      <View>
        {/*  <FlatList
          data={subsectionArray}
          keyExtractor={(item, index) => index.toString()}
          listKey={(item, index) => 'A' + index.toString()}
          renderItem={renderAccordion}
        /> */}

        <VirtualizedList
          data={subsectionArray}
          initialNumToRender={20}
          renderItem={renderAccordion}
          listKey={(item, index) => 'A' + index.toString()}
          keyExtractor={item => item.field1}
          getItemCount={data => data.length}
          getItem={getItem}
        />
      </View>
    );
  }
};

export default Section;
