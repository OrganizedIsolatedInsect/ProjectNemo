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
        // 'select * from (select * from CrimCode WHERE sectionHeader IS NOT NULL ORDER by section desc, sectionHeader asc) group by section',
        //"SELECT DISTINCT heading1label, heading1titletext FROM CCDataV2 WHERE heading1key NOT IN ['115011', '115006']",
        "SELECT DISTINCT heading1label, heading1titletext, heading1key FROM CCDataV2 WHERE heading1key <> '115011' and heading1key <> '115006' ORDER BY heading1key",
        //'select part, section, sectionHeader from (select * from CrimCode WHERE sectionHeader IS NOT NULL ORDER by section desc, sectionHeader asc) group by section',
        [],
        (_tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setDistinctPartsList(temp);
          console.log(temp);
        },
      );
    });
  };

  const renderList = itemdata => {
    return (
      <View>
        {/* <Text
          styles={
            ({textAlign: 'left', color: colors.primaryText},
            [styles.gridItemMargin, styles.heading_1])
          }>
          {itemdata.item.heading1label} - {itemdata.item.heading1titletext}
        </Text> */}
        <CrimCodePartsList
          partsKey={itemdata.item.heading1key}
          heading1label={itemdata.item.heading1label}
          heading1titletext={itemdata.item.heading1titletext}
        />
      </View>
    );
  };

  const FlashListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
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
        /* data={CCSampleTest} */
        data={distinctPartsList}
        renderItem={renderList}
        estimatedItemSize={100}
        ItemSeparatorComponent={FlashListItemSeparator}
      />
    </View>
  );
};

export default PartsCCScreen;
