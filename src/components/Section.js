import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {db} from './Database';
import {useIsFocused} from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

import {addBookmark, removeBookmark} from '../redux/bookmarkSlice';

import {AccordionDown, AccordionUp} from '../assets/icons';

// Heading component with props pageTitle, pagePartTitle, pagePartLabel and pagePartHeadingTitle.
//  ie. pageTitle = Criminal Code of Canada
//      pagePartTitle = Part IV
//      pagePartLabel = Offences Against the Adminstration of Law and Justice
//      pagePartHeadingTitle = Corruption and Disobedience
import {PrintTitle} from './PrintTitle';

/*
component is used in content screens, section is sent as prop and then filtered against the data to
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

  const [pagePartTitle, setPagePartTitle] = useState();
  const [pagePartLabel, setPagePartLabel] = useState();
  const [pagePartHeadingTitle, setPagePartHeadingTitle] = useState();

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
          setPagePartLabel(temp[0].heading1titletext);
          setPagePartTitle(temp[0].heading1label);
          setPagePartHeadingTitle(temp[0].heading2titletext);
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
    setCollapsedState(prevState => !prevState);
  };

  // prettier-ignore
  // Props for the render must be in specific order; isActive needs to be the 3rd prop.
  const renderHeader = (item, index, isActive, sections) => {
    return (
      <View style={[styles.gridListItem, styles.accordionContainerHeader]}>
                <Text>
                {item.flagShowLabel === false && (
                  <Text style={{fontWeight: 'bold', color:'blue'}}>{item.sectionLabel} </Text>
                )}
                {item.subsectionLabel} {item.marginalNote}
                </Text>
        {isActive ? (<AccordionUp /> ) : (<AccordionDown />)}
      </View>
    );
  };

  const renderContent = (item, index, isActive, sections) => {
    //filter data that contains paragraphs based on subsectionKey
    let paraData = dbData.filter(
      (paragraph, i) => dbData[i].subsectionkey == item.subsectionKey,
    );

    //array created to contain paragraphs
    const paraFilter = [];

    for (var i = 0, l = paraData.length; i < l; i++) {
      if (i === 0) {
        paraFilter.push(paraData[i]);
      }
      //compares paragraphText to previous index's paragraphText
      if (i > 0) {
        const prevPara = paraData[i - 1].paragraphText;

        if (paraData[i].paragraphText !== prevPara) {
          paraFilter.push(paraData[i]);
        }
      }
    }

    //check if sectionText needs to be rendered
    if (item.sectionText != null) {
      return (
        <View style={styles.accordionContainer}>
          <Text>{item.sectionText}</Text>
        </View>
      );
    }
    //check if paragraphs exists
    else if (paraFilter.length > 1) {
      return (
        <View style={styles.accordionContainer}>
          <Text>
            {item.subsectionText}
            {'\n'}
          </Text>
          <FlatList
            data={paraFilter}
            keyExtractor={item => item.field1}
            listKey={(item2, index) => 'B' + index.toString()}
            renderItem={renderParagraph}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.accordionContainer}>
          <Text>{item.subsectionText}</Text>
        </View>
      );
    }
  };

  const renderParagraph = ({item, index}) => {
    let subParaData = dbData.filter(
      (subParagraph, i) =>
        dbData[i].paragraphLabel === item.paragraphLabel &&
        dbData[i].paragraphText === item.paragraphText &&
        dbData[i].subparagraphText !== null,
    );

    return (
      <View style={styles.paragraph}>
        <Text>
          {item.paragraphLabel} {item.paragraphText}
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
      <View style={styles.subParagraph}>
        <Text>
          {item.subparagraphLabel} {item.subparagraphText}
        </Text>
      </View>
    );
  };

  if (loading === true) {
    return (
      <SafeAreaView>
        <PrintTitle
          pageTitle="Criminal Code of Canada"
          pagePartTitle={pagePartTitle}
          pagePartLabel={pagePartLabel}
          pagePartHeadingTitle={pagePartHeadingTitle}
        />
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
      </SafeAreaView>
    );
  }
};

export default Section;
