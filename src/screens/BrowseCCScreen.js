/* BROWSE screen - re-usable screen for browses for all legislation
 */

import React, {useState} from 'react';
import { View, FlatList, SectionList, StyleSheet } from 'react-native';

//USER Imports
import {CCDATAPARTS} from '../data/dummy-data'; //for DEVELOPMENT Purposes
import styles from '../assets/styles';
import CrimCodeGridList from '../components/CrimCodeGridList';
import groupBy from 'json-groupby';


const BrowseCCScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false); //for loading spinner


const result = (CCDATAPARTS);


const TestSection = () =>{

//  console.log(groupBy(result, ['part'],['section'],['index'],['sectionHeader']));

 

 const newArray = [];
 newArray.push(result);

 newArray.forEach

// result.forEach(function(part, i){
//   newArray.push(result[part, i])

// });



// function groupBy(objectArray, property) {
//   return objectArray.reduce((acc, obj) => {
//     const key = obj[property];
//     acc[key] ??= [];
//     acc[key].push(obj);
//     return acc;
//   }, {});
// };

//const reformattedArray = groupBy(newArray, 'part' )


// let newDirectory = Object.values(newArray.reduce((acc, item) => {
//   if (!acc[item.part]) acc[item.part] = {
//     part: item.part,
//       data: [item.index, item.section, item.sectionHeader]
//   };
//   acc[item.part].data.push(item.data);
//   return acc;
// }, {}));


 console.log(result);
  // const newArray = result.map(function(item) {
  //   return {
  //       key: item.part,
  //       label: item.section
  //   }

  // });
  // console.log(newArray);

};


  const renderList = itemdata => {

    return (
      <CrimCodeGridList
        index={itemdata.item.index}
        part={itemdata.item.part}
        section={itemdata.item.section}
        sectionHeader={itemdata.item.sectionHeader}
      />
    );
  };
  return (
    <View style={[styles.background, styles.container]}>
      <FlatList
        data={CCDATAPARTS}
        renderItem={renderList}
        keyExtractor={item => item.index}
        ItemSeparatorComponent={() => <View style={{margin: 15}} />}
      />


    </View>

  );
};



export default BrowseCCScreen;
