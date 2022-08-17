/*

*/
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Pressable} from 'react-native';

import Bookmark from '../components/Bookmark';
import styles from '../assets/styles';

function ContentScreen({route}) {
  const { item } = route.params;

  return(
    
    <View>
      <Text>{item.contravention}</Text>
      <Text>{item.source}</Text>
      <Text>Section {item.provision}</Text>
      <Text>{item.sectionText}</Text>
      <Text>{item.sectionSubsection}</Text>
      <Text>{item.sectionParagraph}</Text>
      <Text>{item.sectionSubparagraph}</Text>
      <Text>Ticketed Amount: {item.fine}</Text>
      <Text>Reduced ticked amount: {item.reducedFine}</Text>
    </View>
  )
}

// const ContentScreen = props => {
//   return (
//     <SafeAreaView>
//       <View style={styles.background}>
//         <View style={styles.sectionDivider} />
//         <Text style={[styles.heading_1, styles.neutral]}>
//           DEV screen name: MVA CONTENT
//         </Text>
//         <Text style={styles.heading_2}>Heading 2</Text>
//         <Bookmark />
//         <Text style={[styles.body, styles.accent_1]}>Body</Text>
//         <Text style={[styles.body, styles.accent_2]}>Body 2</Text>
//         <Text>{navigation.getParam('source')}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

export default ContentScreen;

