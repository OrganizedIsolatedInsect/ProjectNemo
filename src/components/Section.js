import React, {useState, useEffect} from 'react';
import styles from '../assets/styles';
import {View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from './Database';
import Accordion from 'react-native-collapsible/Accordion';

import Bookmark from './Bookmark';
import {AccordionDown, AccordionUp} from '../assets/icons';

import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {createSubSectionArray} from './CreateSubSectionArray';

/*
component is used in content screens, section is sent as prop and then filtered against the data to
return data set for paragraphs

temp
*/

const Section = ({section, lawType}) => {
  //section prop passed on from browse screen
  const sectionId = section;
  const localLawType = lawType;
  //set states for database data, loading
  const [dbData, setDbData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //Create array to divide up subsections
  let subsectionArray = [];

  useEffect(() => {
    getDbData(sectionId);
  }, [sectionId]);

  // function to get data from NemoDB
  const getDbData = sectionId => {
    db.transaction(tx => {
      tx.executeSql(
        'Select * from CCDataV2 where heading2Key = ?',
        [sectionId],
        (_tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDbData(temp);
          setLoaded(true);
        },
      );
    });
  };

  //call function to create array containing subsection data to feed into accordion component
  subsectionArray = createSubSectionArray(dbData);

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

  // Props for the render must be in specific order; isActive needs to be the 3rd prop.
  const renderHeader = (item, index, isActive, sections) => {
    return (
      <View
        style={[
          styles.gridListItem,
          !isActive
            ? styles.accordionContainerHeader
            : styles.accordionContainerHeaderNA,
        ]}>
        <CrimCodeRenderHeader
          subsectionData={item}
          style={isActive ? {fontWeight: 'bold'} : null}
        />
        {isActive ? <AccordionUp /> : <AccordionDown />}
      </View>
    );
  };

  const renderContent = (item, index, isActive, sections, marked) => {
    return (
      <View style={styles.accordionContainer}>
        <View style={styles.bookmarkPosition}>
          {/* Bookmark parameters include a callback to the previous parts/section key, labels for passing into the ContentCCSCreen */}
          <Bookmark
            data={item}
            passingKey={item.marginalNoteKey} //CC data only
            lawType={localLawType}
            setMarked={marked}
          />
        </View>
        <CrimCodeRenderBody dbData={dbData} subsectionData={item} />
      </View>
    );
  };

  if (loaded === true) {
    return (
      <SafeAreaView>
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
