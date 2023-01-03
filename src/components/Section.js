import React, {useState, useEffect, useRef} from 'react';
import styles from '../assets/styles';
import {View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from './Database';
import Accordion from 'react-native-collapsible/Accordion';

import Bookmark from './Bookmark';
import {AccordionDown, AccordionUp} from '../assets/icons';
import {PrintTitle} from '../components/PrintTitle';
import {CRIMCODETITLE} from '../assets/constants';
import {
  CrimCodeRenderHeader,
  CrimCodeRenderBody,
} from './CrimCodeRenderSection';
import {createSubSectionArray} from './CreateSubSectionArray';

/*
component is used in content screens, section is sent as prop and then filtered against the data to
return data set for paragraphs
*/

const Section = ({section, lawType, marginalNoteKey}) => {
  //section prop passed on from browse screen = heading2Key
  const sectionId = section;
  const localLawType = lawType;
  //set states for database data, loading
  const [dbData, setDbData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //Create array to divide up subsections
  let subsectionArray = [];
  let idx;

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
  //find where marginal key is within the subsection array and return the index number; this will point to the existing accordion index.
  idx = subsectionArray.findIndex(
    obj => obj.marginalNoteKey === marginalNoteKey,
  );
  const [collapsedState, setCollapsedState] = useState(true);
  // Active Infos is the section number (from react-native-collapsible, NOT our database section)
  // This is to index the section into an array which is used can be used for the isActive state
  // so that we can target the individual accordion icons
  const [activeInfos, setActiveInfos] = useState([]);

  const setInfos = infos => {
    //get rid of undefined as a state option
    infos === undefined ? (infos = []) : infos;
    //setting up a active section state
    setActiveInfos(infos);
    setCollapsedState(prevState => !prevState);
  };

  useEffect(() => {
    if (
      idx !== null && //bookmark position is not null
      idx > -1 && //bookmark position is not less than 0
      activeInfos.indexOf(idx) < 0 //bookmark position does not already exist in actionInfos array
    ) {
      setActiveInfos([idx]);
      setCollapsedState(false);
      changeRenderChildrenCollapsed(true);
    } else {
      changeRenderChildrenCollapsed(false);
    }
  }, [idx]);

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

  //allows the renderContent section to be uncollapsed when coming from the bookmark screen and opening the proper section in the accordion.
  const changeRenderChildrenCollapsed = bool => {
    return bool;
  };

  const renderContent = (item, index, isActive, sections, marked) => {
    return (
      <View style={styles.accordionContainer}>
        <View style={styles.bookmarkPosition}>
          {/* Bookmark parameters include a callback to the previous parts/section key, labels for passing into the ContentCCSCreen */}
          <Bookmark
            data={item}
            marginalNoteKey={item.marginalNoteKey} //CC data only
            heading2Key={item.heading2Key}
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
        <PrintTitle
          pageTitle={CRIMCODETITLE}
          pagePartTitle={dbData[0].heading1TitleText}
          pagePartLabel={dbData[0].heading1Label}
          pagePartHeadingTitle={dbData[0].heading2TitleText}
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
          renderChildrenCollapsed={changeRenderChildrenCollapsed}
          //renderChildrenCollapsed has to be true because it appears to activate the default active section state and opens from bookmark screen.
          renderAsFlatList={true}
        />
      </SafeAreaView>
    );
  }
};

export default Section;
