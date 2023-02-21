import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions, FlatList} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import styles, {colors} from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import {db} from '../components/Database';

import {PrintTitle} from '../components/PrintTitle';

//This screen is created upon clicking the Crim Code option on the Landing Page.
const PartsCCScreen = () => {
  //const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const [renderObject, setRenderObject] = useState(); // contains Parts data from Crim Code for render
  const window = useWindowDimensions();

  useEffect(() => {
    getDbData();
  }, []);

  //Retrieving data except the nonPart sections of "Short Title" Section 1 and "Interpretation" Section 2.  Distinct as we are just returning the Part #
  //Part label, Section #, and Section label.
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
          setRenderObject(temp);
        },
      );
    });
  };

  //Grabs the styles, props, and actions from the CrimCodeGridList component to be rendered.
  const renderList = ({item}) => {
    return (
      <View>
        <CrimCodeGridList
          heading1Key={item.heading1Key}
          heading1Label={item.heading1Label}
          heading1TitleText={item.heading1TitleText}
        />
      </View>
    );
  };

  //creates a thin line between Parts items
  const FlashListItemSeparator = () => {
    return <View style={styles.flashListStyling} />;
  };

  //Calls PrintTitle component to style page then calls Flashlist.
  return (
    <View style={[styles.background, {height: window.height}]}>
      <View>
        <PrintTitle pageTitle="Criminal Code of Canada" />
      </View>
      <FlatList
        data={renderObject}
        renderItem={renderList}
        ItemSeparatorComponent={FlashListItemSeparator}
      />
    </View>
  );
};

export default PartsCCScreen;
