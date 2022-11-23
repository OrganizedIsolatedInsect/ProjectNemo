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

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT DISTINCT heading1Label, heading1TitleText, heading1Key FROM CCDataV2 WHERE heading1Key <> '115011' and heading1Key <> '115006' ORDER BY heading1Key",
        [],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
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
          heading1Key={itemdata.item.heading1Key}
          currentScreen={passingName}
          heading1Label={itemdata.item.heading1Label}
          heading1TitleText={itemdata.item.heading1TitleText}
        />
      </View>
    );
  };

  const FlashListItemSeparator = () => {
    return <View style={styles.flashListStyling} />;
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
        data={distinctPartsList}
        renderItem={renderList}
        estimatedItemSize={49}
        ItemSeparatorComponent={FlashListItemSeparator}
      />
    </View>
  );
};

export default PartsCCScreen;
