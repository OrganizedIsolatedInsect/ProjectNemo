/* BROWSE screen - re-usable screen for browses for all legislation
 */

///SectionList code sample:
///https://blog.logrocket.com/react-native-sectionlist-tutorial-examples/
///https://www.reactnative.express/core_components/lists/sectionlist
///https://reactnative.dev/docs/sectionlist

import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, SectionList, FlatList} from 'react-native';

//USER Imports
import MVA from '../data/mvavt_records.json'; // for PRODUCTION Purposes
import styles, {colors} from '../assets/styles';
import {db} from '../components/Database';
import FilterButton from '../components/FilterButton';

const BrowseMVAScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const navAid = useNavigation();
  const renderCount = useRef(0);
  const [dbData, setDbData] = useState([]);

  const [actFilter, setActFilter] = useState(false);
  const [regFilter, setRegFilter] = useState(false);

  renderCount.current = renderCount.current + 1;
  //console.log(renderCount.current);

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
        /* const actArray = [];
        const regArray = [];

        temp.forEach(item => {
          if (item.source === 'Motor Vehicle Act') {
            actArray.push({title: 'Motor Vehicle Act', data: item});
          }
          if (item.source === 'Motor Vehicle Act Regulations') {
            regArray.push({title: 'Motor Vehicle Act Regulations', data: item});
          }
        });
        setRenderActArray(actArray);
        setRenderRegArray(regArray); */
      });
    });
  };

  //console.log(dbData);
  let actArray = [];
  let regArray = [];
  dbData.forEach(item => {
    if (item.source === 'Motor Vehicle Act') {
      actArray.push(item);
    }
    if (item.source === 'Motor Vehicle Act Regulations') {
      regArray.push(item);
    }
  });

  const mvaRenderHeader = [
    {header: 'Motor Vehicle Act'},
    {header: 'Motor Vehicle Act Regulations'},
  ];

  const renderMVAText = ({item}) => {
    return (
      <View style={styles.container}>
        <Pressable
          key={item.index}
          onPress={() =>
            navAid.navigate('ContentMVAScreen', {
              provisionId: item.provision,
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
                    <FlatList data={actArray} renderItem={renderMVAText} />
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
                    <FlatList data={regArray} renderItem={renderMVAText} />
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
