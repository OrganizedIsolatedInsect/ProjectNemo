///SectionList code sample:
///https://blog.logrocket.com/react-native-sectionlist-tutorial-examples/
///https://www.reactnative.express/core_components/lists/sectionlist
///https://reactnative.dev/docs/sectionlist

import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, SectionList} from 'react-native';

//USER Imports
import {db} from '../components/Database';
import styles, {colors} from '../assets/styles';

const BrowseMVAScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner
  const [dbData, setDbData] = useState([]); //local data array
  const navAid = useNavigation();

  let data_Act = [];
  let data_Reg = [];

  const data_Act_Array = [];
  const data_Reg_Array = [];
  const [ShowAct, setShowAct] = useState(data_Act_Array);
  const [ShowReg, setShowReg] = useState(data_Reg_Array);
  const [ShowActButton, setShowActButton] = useState(true);
  const [ShowRegButton, setShowRegButton] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getDbData();
    setIsLoading(false);
  }, [isLoading]);

  const getDbData = () => {
    const temp = [];
    db.transaction(tx => {
      tx.executeSql(
        'SELECT [index], provision, contravention, source, fine FROM MVA',
        [],
        (_tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          if (temp.length > 0) {
            setDbData(temp);
          }
        },
      );
    });
  };

  //second use effect implemented after data grabbed from database.
  //to initialize the next layer of set states
  useEffect(() => {
    filterData();
  }, [dbData, ShowActButton, ShowRegButton]);

  ///filter JSON data
  const filterData = () => {
    data_Act = dbData.filter(element => element.source === 'Motor Vehicle Act');
    data_Reg = dbData.filter(
      element => element.source === 'Motor Vehicle Act Regulations',
    );
    //Add title to the array
    data_Act_Array.push({title: 'Motor Vehicle Act', data: data_Act});
    data_Reg_Array.push({
      title: 'Motor Vehicle Act Regulations',
      data: data_Reg,
    });
    if (ShowActButton === true) {
      setShowAct(data_Act_Array);
    } else {
      setShowAct([]);
    }
    if (ShowRegButton === true) {
      setShowReg(data_Reg_Array);
    } else {
      setShowReg([]);
    }
  };

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

  return (
    <View style={styles.background}>
      <View style={styles.buttonParentContainer}>
        {/* ACT BUTTON */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={{
              ...styles.buttonAct,
              backgroundColor: ShowActButton
                ? colors.primary
                : colors.backgroundColoring,
            }}
            onPress={() => onPressActHandler()}
            android_ripple={{
              color: 'black',
            }}>
            <Text
              style={{
                ...styles.buttonActText,
                color: ShowActButton ? colors.neutral : colors.fontColoring,
              }}>
              Act
            </Text>
          </Pressable>
        </View>
        <View>
          <Text> </Text>
        </View>
        {/* REGULATIONS BUTTON */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={{
              ...styles.buttonAct,
              backgroundColor: ShowRegButton
                ? colors.primary
                : colors.backgroundColoring,
            }}
            onPress={() => onPressRegHandler()}
            android_ripple={{color: 'black'}}>
            <Text
              style={{
                ...styles.buttonActText,
                color: ShowRegButton ? colors.neutral : colors.fontColoring,
              }}>
              Regulations
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        {/* Start of SectionList
         * Upon pressing an item, the Provision and the screen name is passed to the Content MVA Screen
         */}

        <SectionList
          sections={[...ShowAct, ...ShowReg]}
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
