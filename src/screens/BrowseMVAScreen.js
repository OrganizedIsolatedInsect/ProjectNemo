/* BROWSE screen - re-usable screen for browses for all legislation
 */

///SectionList code sample:
///https://blog.logrocket.com/react-native-sectionlist-tutorial-examples/
///https://www.reactnative.express/core_components/lists/sectionlist
///https://reactnative.dev/docs/sectionlist

import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, FlatList} from 'react-native';

//USER Imports
import styles, {colors} from '../assets/styles';
import {db} from '../components/Database';
import FilterButton from '../components/FilterButton';

const BrowseMVAScreen = props => {
  const navAid = useNavigation();
  const renderCount = useRef(0); // created to count render cycles
  const [dbData, setDbData] = useState([]); //  array to house data from NemoDb
  const [actFilter, setActFilter] = useState(false); // Boolean for Motor Vehicle Act filter
  const [regFilter, setRegFilter] = useState(false); // Boolean for Motor Vehicle Act Regulation filter
  let actArrayRender = []; // array to house Motor Vehicle Act data
  let regArrayRender = []; // array to house Motor Vehicle Act Regulation Data

  renderCount.current = renderCount.current + 1;

  //pull db data after mount
  useEffect(() => {
    getDbData();
  }, []);

  // function to get data from NemoDB
  const getDbData = () => {
    db.transaction(tx => {
      tx.executeSql('Select * from MVA', [], (_tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setDbData(temp);
      });
    });
  };

  //split data into different Arrays
  dbData.forEach(item => {
    if (item.source === 'Motor Vehicle Act') {
      actArrayRender.push(item);
    }
    if (item.source === 'Motor Vehicle Act Regulations') {
      regArrayRender.push(item);
    }
  });

  // used in flatlist to filter and split based on type of data
  const mvaRenderHeader = [
    {header: 'Motor Vehicle Act'},
    {header: 'Motor Vehicle Act Regulations'},
  ];

  //render text from data
  const renderMVAText = ({item}) => {
    return (
      <View style={styles.container}>
        <Pressable
          key={item.index}
          onPress={() =>
            navAid.navigate('ContentMVAScreen', {
              provisionKey: item.provision,
            })
          }
          android_ripple={{color: styles.AndroidRiplePressable}}
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

  return (
    <View style={styles.background}>
      <View style={styles.buttonParentContainer}>
        <FilterButton
          buttonLabel="Act"
          setFilter={setActFilter}
          filterState={actFilter}
        />
        <FilterButton
          buttonLabel="Regulations"
          setFilter={setRegFilter}
          filterState={regFilter}
        />
      </View>
      <View>
        <FlatList
          data={mvaRenderHeader}
          renderItem={({item}) => {
            if (item.header === 'Motor Vehicle Act' && actFilter === false) {
              return (
                <View>
                  <View style={styles.sectionListTitle}>
                    <Text
                      style={{...styles.heading_1, color: colors.primaryText}}>
                      {item.header}
                    </Text>
                    <Text style={{...styles.heading_2}}>Definitions</Text>
                  </View>
                  <View>
                    <FlatList
                      data={actArrayRender}
                      renderItem={renderMVAText}
                    />
                  </View>
                </View>
              );
            }
            if (
              item.header === 'Motor Vehicle Act Regulations' &&
              regFilter === false
            ) {
              return (
                <View>
                  <View style={styles.sectionListTitle}>
                    <Text
                      style={{...styles.heading_1, color: colors.primaryText}}>
                      {item.header}
                    </Text>
                    <Text style={{...styles.heading_2}}>Definitions</Text>
                  </View>
                  <View>
                    <FlatList
                      data={regArrayRender}
                      renderItem={renderMVAText}
                    />
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default BrowseMVAScreen;
