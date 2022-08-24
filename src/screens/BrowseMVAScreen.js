/* BROWSE screen - re-usable screen for browses for all legislation
 */

///SectionList code sample:
///https://blog.logrocket.com/react-native-sectionlist-tutorial-examples/
///https://www.reactnative.express/core_components/lists/sectionlist
///https://reactnative.dev/docs/sectionlist

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, SectionList} from 'react-native';

//USER Imports
import MVA from '../data/mvavt_records.json'; // for PRODUCTION Purposes
import {MVAData} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles, {colors} from '../assets/styles';

const BrowseMVAScreen = props => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner

  const navAid = useNavigation();

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

  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        {/* ACT BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowActButton
              ? colors.primary
              : colors.backgroundColoring,
          }}
          onPress={() => onPressActHandler()}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowActButton ? colors.neutral : colors.fontColoring,
            }}>
            Act
          </Text>
        </Pressable>
        <View>
          <Text> </Text>
        </View>
        {/* REGULATIONS BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowRegButton
              ? colors.primary
              : colors.backgroundColoring,
          }}
          onPress={() => onPressRegHandler()}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowRegButton ? colors.neutral : colors.fontColoring,
            }}>
            Regulations
          </Text>
        </Pressable>
      </View>
      <View>
        {/* Start of SectionList */}

        <SectionList
          sections={[...ShowAct, ...ShowReg]}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Pressable
                key={item.index}
                onPress={() =>
                  navAid.navigate('ContentMVAScreen', {paramkey: item})
                }
                style={styles.innerContainer}>
                <View style={styles.innerContainerLeft}>
                  <Text>{item.contravention}</Text>
                  <Text>{item.provision}</Text>
                </View>
                <View style={styles.innerContainerRight}>
                  <Text>{item.fine}</Text>
                </View>
              </Pressable>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionListTitle}>
              <Text style={styles.heading_1}>{section.title}</Text>
              <Text style={styles.heading_2}>Definition</Text>
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
