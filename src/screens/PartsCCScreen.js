/* Parts screen - re-usable screen for the Parts List for just the Criminal Code Legislation
 */

import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import Reactotron from 'reactotron-react-native';
import {FlashList} from '@shopify/flash-list';

//USER Imports
//import {CCDATAPARTS, CCDATASECTION, CCSampleTest} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles, {colors} from '../assets/styles';
import {CrimCodePartsList} from '../components/CrimCodeGridList';
import {db} from '../components/Database';

const PartsCCScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const [distinctPartsList, setDistinctPartsList] = useState();
  const window = useWindowDimensions();

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
          setDistinctPartsList(temp);
        },
      );
    });
  };

  const renderList = itemdata => {
    return (
      <View>
        <CrimCodePartsList
          heading1key={itemdata.item.heading1key}
          heading1label={itemdata.item.heading1label}
          heading1titletext={itemdata.item.heading1titletext}
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
      {Reactotron.log('PartsCC Render')}
      <View>
        <Text
          style={[
            styles.title,
            styles.titleMargin,
            {color: colors.primaryText},
          ]}>
          Criminal Code of Canada
        </Text>
      </View>
      <FlashList
        data={distinctPartsList}
        renderItem={renderList}
        estimatedItemSize={123}
        ItemSeparatorComponent={FlashListItemSeparator}
      />
    </View>
  );
};

export default PartsCCScreen;
