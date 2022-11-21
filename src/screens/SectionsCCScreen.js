import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';

//USER Imports
import styles, {colors} from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import {db} from '../components/Database';

import {PrintTitle} from '../components/PrintTitle';

const SectionsCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const [distinctSectionList, setDistinctSectionList] = useState();

  const [pagePartTitle, setPagePartTitle] = useState();
  const [pagePartLabel, setPagePartLabel] = useState();

  const window = useWindowDimensions();

  let heading1KeyParam = props.route.params.passingKey;

  // let pagePartTitle = props.route.params.pagePartTitle;
  // let pagePartLabel = props.route.params.pagePartLabel;
  let pagePartHeadingTitle = props.route.params.pagePartHeadingTitle;

  console.log('SectionsCCScreen');

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'select distinct a.heading1key, a.heading1label, a.heading1titletext, a.heading2key, a.heading2titletext, (select b.sectionlabel from CCDataV2 b where b.heading2key=a.heading2key order by sectionkey limit 1) as firstSectionLabel from CCDataV2 a where (a.heading1key = cast(? as integer)) order by a.heading2key',
        [heading1KeyParam],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setPagePartLabel(temp[0].heading1titletext);
          setPagePartTitle(temp[0].heading1label);
          setDistinctSectionList(temp);
        },
      );
    });
  };

  const renderList = itemdata => {
    let passingName = 'SectionsCCScreen';
    return (
      <View>
        <CrimCodeGridList
          headingkey={itemdata.item.heading2key}
          currentScreen={passingName}
          headinglabel={itemdata.item.firstSectionLabel}
          headingtitletext={itemdata.item.heading2titletext}
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
