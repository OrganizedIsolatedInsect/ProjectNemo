import React, {useState, useEffect} from 'react';
import styles, {colors} from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, VirtualizedList, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {db} from './Database';
import {useIsFocused} from '@react-navigation/native';
import Reactotron from 'reactotron-react-native';
import SQLite from 'react-native-sqlite-storage';
import Accordion from 'react-native-collapsible/Accordion';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';
import {Item} from 'react-navigation-header-buttons';
import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';

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
    // compares state array to see if section exists in bookmarks, if it does turn on bookmark icon
    if (bookmarkStateId.some(e => e.section == section)) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [marked, isFocused]);

  useEffect(() => {
    getDbData(sectionId);
  }, [sectionId]);

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
    const sectionText = dbData[i].sectiontext;
    let prevSectionLabel = '';

    if (i > 0) {
      prevSectionLabel = dbData[i - 1].sectionlabel;
    }
    //create flag to see if this is the first label of a new section
    const flagShowLabel = sectionLabel === prevSectionLabel;

    //function to push subsections into subsectionArray
    /* eslint-disable */
    const pushArray = (
      field1,
      sectionLabel,
      subsectionLabel,
      marginalNote,
      subsectionText,
      sectionText,
      sectionKey,
      subsectionKey,
      flagShowLabel,
    ) => {
      subsectionArray.push({
        field1: field1,
        sectionLabel: sectionLabel,
        subsectionLabel: subsectionLabel,
        marginalNote: marginalNote,
        subsectionText: subsectionText,
        sectionText: sectionText,
        sectionKey: sectionKey,
        subsectionKey: subsectionKey,
        flagShowLabel: flagShowLabel,
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
        sectionText,
        sectionKey,
        subsectionKey,
        flagShowLabel,
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
          sectionText,
          sectionKey,
          subsectionKey,
          flagShowLabel,
        );
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

  const [collapsedState, setCollapsedState] = useState(true);
  // Active Infos is the section number (from react-native-collapsible, NOT our database section)
  // This is to index the section into an array which is used can be used for the isActive state
  // so that we can target the individual accordion icons
  const [activeInfos, setActiveInfos] = useState([]);

  const setInfos = infos => {
    //setting up a active section state
    setActiveInfos(infos.includes(undefined) ? [] : infos);
    // setCollapsedState(!collapsedState);
    setCollapsedState(prevState => !prevState);
    // console.log('collapsedState:', collapsedState);
  };

  // prettier-ignore
  // Props for the render must be in specific order; isActive needs to be the 3rd prop.
  const renderHeader = (item, index, isActive, sections) => {
    return (
      <View style={[styles.gridListItem, styles.accordionContainerHeader]}>
                <CrimCodeRenderHeader
                subsectionData={item}
                />
                 {isActive ? (
        <Icon name="keyboard-arrow-up" size={20} />
      ) : (
        <Icon name="keyboard-arrow-down" size={20} />
      )}
      </View>
    );
  };

  /* eslint-disable */

  const renderContent = (item, index, isActive, sections) => {
    return (
      <View style={styles.accordionContainer}>
        <CrimCodeRenderBody dbData={dbData} subsectionData={item} />
      </View>
    );
  };

  if (loading === true) {
    return (
      <View>
        <Accordion
          activeSections={activeInfos}
          //for any default active section
          sections={subsectionArray}
          //title and content of accordion
          touchableComponent={Pressable}
          //which type of touchable component you want
          expandMultiple={true}
          //Do you want to expand mutiple at a time or single at a time
          renderHeader={renderHeader}
          //Header Component(View) to render
          renderContent={renderContent}
          //Content Component(View) to render
          duration={100}
          //Duration for Collapse and expand
          onChange={setInfos}
          //setting the state of active sections
          renderChildrenCollapsed={false}
          renderAsFlatList={true}
        />
      </View>
    );
  }
};

export default Section;
