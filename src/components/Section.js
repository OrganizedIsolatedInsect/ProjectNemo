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
        'Select * from CCDataV2 where sectionlabel = ?',
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
    const index = dbData[i].field1;
    const section = dbData[i].sectionlabel;
    const subsection = dbData[i].subsectionlabel;
    const subsectionHeader = dbData[i].marginalnote;
    const subsectionText = dbData[i].subsectiontext;

    //function to push subsections into subsectionArray
    const pushArray = (
      index,
      section,
      subsection,
      subsectionHeader,
      subsectionText,
    ) => {
      subsectionArray.push({
        index: index,
        section: section,
        subsection: subsection,
        subsectionHeader: subsectionHeader,
        subsectionText: subsectionText,
      });
    };

    if (i === 0) {
      pushArray(index, section, subsection, subsectionHeader, subsectionText);
    } else {
      const prevSubsection = dbData[i - 1].subsectionlabel;
      if (subsection !== prevSubsection) {
        pushArray(index, section, subsection, subsectionHeader, subsectionText);
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

  if (loading === true) {
    return (
      <ScrollView>
        {subsectionArray.map((item, i) => {
          if (i == 0) {
            return (
              <View>
                <Collapse>
                  <CollapseHeader>
                    <View style={styles.accordionContainerHeader} key={i}>
                      <Text>
                        {item.section}
                        {item.subsection}
                        {item.subsectionHeader}
                      </Text>
                      <Icon name="keyboard-arrow-right" size={20} />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={styles.accordionContainer}>
                      <Text>{item.subsectionText}</Text>
                    </View>
                  </CollapseBody>
                </Collapse>
              </View>
            );
          } else {
            return (
              <View>
                <Collapse>
                  <CollapseHeader>
                    <View style={styles.accordionContainerHeader} key={i}>
                      <Text>
                        {item.subsection}
                        {item.subsectionHeader}
                      </Text>
                      <Icon name="keyboard-arrow-right" size={20} />
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={styles.accordionContainer}>
                      <Text>{item.subsectionText}</Text>
                    </View>
                  </CollapseBody>
                </Collapse>
              </View>
            );
          }
        })}
      </ScrollView>
    );
  }
};

export default Section;
