
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, ScrollView, StyleSheet} from 'react-native';

//USER Imports
import Bookmark from '../components/Bookmark';
import MVA from '../data/mvavt_records.json';
import styles from '../assets/styles';

const BrowseScreen = props => {

  const [ShowAct, setShowAct] = useState(true);
  const [ShowReg, setShowReg] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const navAid = useNavigation();

  /*
Preps texts for output to Flatlist;  also calls the Bookmark button state change.  Change Bookmark.js to send data to add/delete from bookmark array
*/
  // const renderBrowseList = ({item}) => {
  //   return (
  //     <View style={{flexDirection: 'row'}}>
  //       <Pressable onPress={() => navAid.navigate('MVAContent')}><Text>{item.title}</Text></Pressable>
  //       <Bookmark />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.background}>
      <View style={styles.buttonContainer}>
        {/* Hide Show View component
        https://snack.expo.dev/@kkevranian/example-to-hide-show-view-component-in-react-native-on-button-click?platform=web */}

        {/* ACT BUTTON */}

        <Pressable
          style={{
            ...styles.buttonAct,
            backgroundColor: ShowAct ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => setShowAct(!ShowAct)}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowAct ? '#E6E6E6' : '#000000',
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
            backgroundColor: ShowReg ? '#7F2025' : '#FFFFFF',
          }}
          onPress={() => setShowReg(!ShowReg)}>
          <Text
            style={{
              ...styles.buttonActText,
              color: ShowReg ? '#E6E6E6' : '#000000',
            }}>
            Regulations
          </Text>
        </Pressable>

        {/*Here we will return the view when state is true and will return false if state is false*/}
      </View>
      <View>
        <ScrollView>
          {ShowAct ? (
            <View style={styles.container}>
              <Text style={styles.heading_1}>Motor Vehicle Act</Text>
              <Text style={styles.heading_2}>Definitions</Text>
              {MVA.filter(MVA_List => {
                return MVA_List.source === 'Motor Vehicle Act';
              }).map(MVA_List => {
                return (
                  <Pressable
                    key={MVA_List.index}
                    onPress={() => navAid.navigate('ContentScreen')}
                    style={styles.innerContainer}>
                    <View style={styles.innerContainerLeft}>
                      <Text>{MVA_List.contravention}</Text>
                      <Text>{MVA_List.provision}</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                      <Text>{MVA_List.fine}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : null}

          {ShowReg ? (
            <View style={styles.container}>
              <Text style={styles.heading_1}>Motor Vehicle Act Regulation</Text>
              <Text style={styles.heading_2}>Definitions</Text>
              {MVA.filter(MVA_List => {
                return MVA_List.source === 'Motor Vehicle Act Regulations';
              }).map(MVA_List => {
                return (
                  <Pressable
                    key={MVA_List.index}
                    style={styles.innerContainer}
                    onPress={() => navAid.navigate('ContentScreen')}>
                    <View style={styles.innerContainerLeft}>
                      <Text>{MVA_List.contravention}</Text>
                      <Text>{MVA_List.provision}</Text>
                    </View>
                    <View style={styles.innerContainerRight}>
                      <Text>{MVA_List.fine}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default BrowseScreen;

// const stylesMVA = StyleSheet.create({
//   container: {
//     paddingTop: 20,
//     paddingHorizontal: 30,
//     marginBottom: 50,
//     flexDirection: 'column',
//     alignContent: 'space-between',
//   },
//   innerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 0.8,
//     borderBottomColor: 'black',
//   },
//   innerContainerLeft: {
//     paddingVertical: 9,
//     flex: 1,
//     width: '70%',
//   },
//   innerContainerRight: {
//     alignItems: 'flex-end',
//   },
//   buttonContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     padding: 10,
//     marginHorizontal: 20,
//     marginBottom: 10,
//     justifyContent: 'flex-start',
//   },
//   buttonAct: {
//     borderRadius: 25,
//     borderColor: '#7F2025',
//     borderWidth: 1,
//     width: 120,
//     padding: 5,
//   },
//   buttonActText: {
//     fontFamily: 'Lato-Regular',
//     fontSize: 17,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     textAlignVertical: 'center',
//   },
// });

{
  /// Maping JSON example ///
  /* {MVA.map(MVA_List => {
return (
  <View key={MVA_List.index} style={stylesMVA.innerContainer}>
    <View>
      <Text>{MVA_List.contravention}</Text>
    </View>
    <View>
      <Text>{MVA_List.provision}</Text>
    </View>
    <View>
      <Text>{MVA_List.fine}</Text>
    </View>
  </View>
);
})} */
  // Fetch data from JSON: https://www.youtube.com/watch?v=aJgAwjP20RY
  // Used Filter then map JSON: https://www.youtube.com/watch?v=8MoElay6dWU
}