import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import {db} from '../components/Database';

import {PrintTitle} from '../components/PrintTitle';

const SectionsCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const [distinctSectionList, setDistinctSectionList] = useState();

  const window = useWindowDimensions();

  let heading1KeyParam = props.route.params.passingKey;

  let pagePartTitle = props.route.params.heading1Label; // example: Part II
  let pagePartLabel = props.route.params.heading1TitleText; // example: Offences Against Public Order

  useEffect(() => {
    getDbData();
  }, []);

  //Get distinct sections within the selected Part.  Emulates the online table of contents by using heading1key (Parts) to identify the list of sections to include
  //Items are grouped so that the title of the sections takes priority and sql chooses the first section # from list to display.
  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'select distinct a.heading1Key, a.heading1Label, a.heading1TitleText, a.heading2Key, a.heading2TitleText, (select b.sectionLabel from CCDataV2 b where b.heading2Key=a.heading2Key order by sectionKey limit 1) as sectionLabel from CCDataV2 a where (a.heading1Key = cast(? as integer)) order by a.heading2Key',
        [heading1KeyParam],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDistinctSectionList(temp);
        },
      );
    });
  };

  //Calls the CrimCodeGridList.js component to display styles, actions.
  const renderList = itemdata => {
    let passingName = 'SectionsCCScreen'; //identifies which screen the CrimCodeGridList.js component is being called from.

    return (
      <View>
        <CrimCodeGridList
          headingKey={itemdata.item.heading2Key}
          currentScreen={passingName}
          sectionLabel={itemdata.item.sectionLabel}
          heading2TitleText={itemdata.item.heading2TitleText}
          heading1Label={itemdata.item.heading1Label}
          heading1TitleText={itemdata.item.heading1TitleText}
        />
      </View>
    );
  };

  return (
    <View style={[styles.background, {height: window.height}]}>
      <View>
        <PrintTitle
          pageTitle="Criminal Code of Canada"
          pagePartTitle={pagePartTitle}
          pagePartLabel={pagePartLabel}
        />
      </View>
      <FlashList
        data={distinctSectionList}
        renderItem={renderList}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default SectionsCCScreen;
