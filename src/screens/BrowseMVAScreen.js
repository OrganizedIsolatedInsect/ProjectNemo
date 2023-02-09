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

  ///filter JSON data
  const data_Act = MVA.filter(
    element => element.source === 'Motor Vehicle Act',
  );
  const data_Reg = MVA.filter(
    element => element.source === 'Motor Vehicle Act Regulations',
  );

  ///Add title to the array
  const data_Act_Array = [];
  data_Act_Array.push({title: 'Motor Vehicle Act', data: data_Act});

  const data_Reg_Array = [];
  data_Reg_Array.push({title: 'Motor Vehicle Act Regulations', data: data_Reg});

  const [ShowAct, setShowAct] = useState(data_Act_Array);
  const [ShowReg, setShowReg] = useState(data_Reg_Array);

  const [ShowActButton, setShowActButton] = useState(true);
  const [ShowRegButton, setShowRegButton] = useState(true);

  const onPressActHandler = () => {
    ///UseState boolean example
    ///https://codesandbox.io/s/usestate-boolean-basic-example-iepcl?file=/src/Test.tsx

    if (ShowAct.length === 0) {
      setShowAct(data_Act_Array);
      setShowActButton(!ShowActButton);
    } else {
      setShowAct([]);
    }
    setShowActButton(!ShowActButton);
  };

  const onPressRegHandler = () => {
    if (ShowReg.length === 0) {
      setShowReg(data_Reg_Array);
      setShowRegButton(!ShowRegButton);
    } else {
      setShowReg([]);
    }
    setShowRegButton(!ShowRegButton);
  };

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
                </View>
              );
            }
          }}
        />
        {/* Start of SectionList
         * Upon pressing an item, the Provision and the screen name is passed to the Content MVA Screen
         */}

        <SectionList
          sections={[]}
          renderItem={({item}) => (
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
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionListTitle}>
              <Text style={{...styles.heading_1, color: colors.primaryText}}>
                {section.title}
              </Text>
              <Text style={{...styles.heading_2}}>Definitions</Text>
            </View>
          )}
          keyExtractor={item => item.index}
          stickySectionHeadersEnabled
        />

        {/* End of SectionList */}
      </View>
    </View>
  );
};

export default BrowseMVAScreen;
