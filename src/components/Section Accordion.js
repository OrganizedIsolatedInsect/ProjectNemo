/* eslint-disable react-hooks/exhaustive-deps */
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
    const index = dbData[i].index;
    const section = dbData[i].section;
    const subsection = dbData[i].subsection;
    const subsectionHeader = dbData[i].subsectionHeader;
    const subsectionText = dbData[i].subsectionText;

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
      const prevSubsection = dbData[i - 1].subsection;

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

  //bookmark to dispatch redux action to add bookmark
  // ONPRESS requires the LawType because when the Bookmark is clicked, that field must be passed into the redux
  const SectionHeader = ({section, sectionHeader}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.heading_2}>
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
            <Text style={styles.heading_2}>{subsectionHeader}</Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text>
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
        <View style={{marginTop: 20}}>
          <SubsectionHeader
            subsection={item.subsection}
            subsectionHeader={item.subsectionHeader}
            subsectionText={item.subsectionText}
          />
        </View>
        <View>
          <FlatList
            data={paraFilter}
            keyExtractor={data => data.index}
            renderItem={renderItemPara}
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
        <View>
          <Text style={[styles.paragraph]}>
            {/*  In{item.index} */}
            {item.paragraph} {item.paragraphText}
          </Text>
          <FlatList
            data={subparaData}
            renderItem={renderSubPara}
            keyExtractor={data => data.index}
          />
        </View>
      );
    }
  };

  const getItem = (data, index) => {
    return data[index];
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
  const renderHeader = (item, _, isActive) => {
    return (
      <View style={[styles.gridListItem, styles.accordionContainerHeader]} key={item.index}>
        <Text>
          {item.subsectionHeader} {item.marginalNote}
        </Text>
        {isActive ? (<Icon name="keyboard-arrow-up" size={20} /> ) : (<Icon name="keyboard-arrow-down" size={20} />)} 
      </View>
    );
  };

  /* eslint-disable */
  // prettier-ignore
  const renderContent = item => {
    return (
      <View>
        <Text>
          {item.subsectionText}
          {'\n'}
          {item.paragraphLabel !== null ? (
            <View>
              <Text>
                {item.paragraphLabel}
                <Text>
                  {item.paragraphText}
                </Text>
              </Text>
            </View>
          ) : null}
          {item.subparagraphLabel} {item.subparagraphText}
          {item.clauseLabel} {item.clauseText}
          {item.subclauseLabel} {item.subclauseText}
        </Text>
      </View>
    );
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
            keyExtractor={item => item.index}
          />

          {/*  <VirtualizedList
            data={subsectionArray}
            initialNumToRender={4}
            renderItem={renderItemSubsection}
            keyExtractor={data => data.index}
            getItemCount={data => data.length}
            getItem={getItem}
          /> */}
        </View>
      </SafeAreaView>
    );
  }
};

export default Section;
