import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import styles, {colors} from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import {db} from '../components/Database';

import {PrintTitle} from '../components/PrintTitle';

const PartsCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const [distinctPartsList, setDistinctPartsList] = useState();
  const window = useWindowDimensions();

  let pagePartTitle;
  let pagePartLabel;

  console.log('PartsCCScreen');

  const [pagePartHeadingTitle, setPagePartHeadingTitle] = useState();

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT DISTINCT heading1label, heading1titletext, heading1key FROM CCDataV2 WHERE heading1key <> '115011' and heading1key <> '115006' ORDER BY heading1key",
        [],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setPagePartHeadingTitle(temp[0].heading2titletext);
          setDistinctPartsList(temp);
        },
      );
    });
  };

  const renderList = itemdata => {
    let passingName = 'PartsCCScreen';
    return (
      <View>
        <CrimCodeGridList
          headingkey={itemdata.item.heading1key}
          currentScreen={passingName}
          headinglabel={itemdata.item.heading1label}
          headingtitletext={itemdata.item.heading1titletext}
        />
      </View>
    );
  };

  const FlashListItemSeparator = () => {
    return <View style={styles.flashListStyling} />;
  };

  return (
    <View
      style={[styles.background, styles.container, {height: window.height}]}>
      <View>
        <PrintTitle
          pagePartTitle={pagePartTitle}
          pagePartLabel={pagePartLabel}
        />
      </View>
      <FlashList
        data={distinctPartsList}
        renderItem={renderList}
        estimatedItemSize={49}
        ItemSeparatorComponent={FlashListItemSeparator}
      />
    </View>
  );
};

export default PartsCCScreen;
