/* BROWSE screen - re-usable screen for browses for all legislation
 */

///SectionList code sample:
///https://blog.logrocket.com/react-native-sectionlist-tutorial-examples/
///https://www.reactnative.express/core_components/lists/sectionlist
///https://reactnative.dev/docs/sectionlist

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  Pressable,
  SectionList,
  FlatList,
  Button,
} from 'react-native';

import styles, {colors} from '../assets/styles';

import FilterButton from '../components/FilterButton';

import {openDatabase} from 'react-native-sqlite-storage';

// Connction to access the pre-populated NemoDB.db
const db = openDatabase({name: 'NemoDB.db', createFromLocation: 1});

const BrowseMVAScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const navAid = useNavigation();

  let [flatListItems, setFlatListItems] = useState([]);

  // Separate queries for "filtering" MVA types. Probably not needed and can be removed.
  // const queryForMvaAct = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       "SELECT * FROM MVA WHERE SOURCE = 'Motor Vehicle Act'",
  //       [],
  //       (tx, results) => {
  //         let temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           temp.push(results.rows.item(i));
  //         setFlatListItems(temp);
  //         console.log('Query for Motor Vehicle Acts');
  //       },
  //     );
  //   });
  // };

  // const queryForMvaActRegulations = () => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       "SELECT * FROM MVA WHERE SOURCE = 'Motor Vehicle Act Regulations'",
  //       [],
  //       (tx, results) => {
  //         let temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           temp.push(results.rows.item(i));
  //         setFlatListItems(temp);
  //         console.log('Query for MVA Regulations');
  //       },
  //     );
  //   });
  // };

  // On screen load, query the database for all MVA content and put it into an array.
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM MVA', [], (tx, results) => {
        let tempAll = [];
        for (let i = 0; i < results.rows.length; ++i)
          tempAll.push(results.rows.item(i));
        setFlatListItems(tempAll);
        console.log('Query for all MVA');
        // console.log(tempAll);
      });
    });
  }, []);

  ///filter MVA data in array
  let dataAct = flatListItems.filter(
    item => item.source === 'Motor Vehicle Act',
  );

  let dataRegulations = flatListItems.filter(
    item => item.source === 'Motor Vehicle Act Regulations',
  );

  ///Add title to the array
  const dataActArray = [];
  dataActArray.push({title: 'Motor Vehicle Act', data: dataAct});

  const dataRegulationsArray = [];
  dataRegulationsArray.push({
    title: 'Motor Vehicle Act Regulations',
    data: dataRegulations,
  });

  const [ShowAct, setShowAct] = useState(dataActArray);
  const [ShowReg, setShowReg] = useState(dataRegulationsArray);

  const [ShowActButton, setShowActButton] = useState(true);
  const [ShowRegButton, setShowRegButton] = useState(true);

  const onPressActHandler = () => {
    ///UseState boolean example
    ///https://codesandbox.io/s/usestate-boolean-basic-example-iepcl?file=/src/Test.tsx

    if (ShowAct.length === 0) {
      setShowAct(dataActArray);
      setShowActButton(!ShowActButton);
    } else {
      setShowAct([]);
    }
    setShowActButton(!ShowActButton);
  };

  const onPressRegHandler = () => {
    if (ShowReg.length === 0) {
      setShowReg(dataRegulationsArray);
      setShowRegButton(!ShowRegButton);
    } else {
      setShowReg([]);
    }
    setShowRegButton(!ShowRegButton);
  };

  // RenderItem for section list removed from body to improve performance.
  // Defines each item in the list
  const mvaListRenderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Pressable
          key={item.index}
          onPress={() => navAid.navigate('ContentMVAScreen', {paramkey: item})}
          style={styles.innerContainer}>
          <View style={styles.innerContainerLeft}>
            <Text
              style={{
                ...styles.MVAContentSectionText,
                color: colors.primaryText,
              }}>
              {item.contravention}
              {'\n'}
              {item.provision}
            </Text>
          </View>
          <View style={styles.innerContainerRight}>
            <Text
              style={{
                ...styles.MVAContentSectionText,
                color: colors.primaryText,
              }}>
              {item.fine}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  // Section Header from section list removed from body to improve performance.
  // Defines the section header content
  const mvaListSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionListTitle}>
        <Text style={{...styles.heading_1, color: colors.primaryText}}>
          {section.title}
        </Text>
        <Text style={{...styles.heading_2}}>Definitions</Text>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        <FilterButton
          buttonLabel="Motor Vehicle Act"
          onPress={onPressActHandler}
        />
        <FilterButton
          buttonLabel="Motor Vehicle Regulations"
          onPress={onPressRegHandler}
        />
      </View>
      <View>
        {/* Start of SectionList */}

        <SectionList
          sections={[...ShowAct, ...ShowReg]}
          renderItem={mvaListRenderItem}
          renderSectionHeader={mvaListSectionHeader}
          keyExtractor={item => item.index}
          stickySectionHeadersEnabled
        />

        {/* End of SectionList */}
      </View>
    </View>
  );
};

export default BrowseMVAScreen;
