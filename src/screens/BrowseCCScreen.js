import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, FlatList, StyleSheet} from 'react-native';

const BrowseCCScreen = () => {
  const dummyData = [
    {
      section: '2.2',
      sectionHeader: "Acting on victim's behalf",
    },
    {
      section: '2.3',
      sectionHeader: 'Concurrent jurisdiction',
    },
    {
      section: '3',
      sectionHeader: 'Descriptive cross-references',
    },
    {
      section: '3.1',
      sectionHeader: 'Effect of judicial acts',
    },
    {
      section: '4',
      sectionHeader: 'Postcard a chattel, value',
    },
  ];

  const navAid = useNavigation();

  return (
    <View>
      <FlatList
        data={dummyData}
        renderItem={({item}) => (
          <Pressable
            onPress={section =>
              navAid.navigate('ContentCCScreen', {
                section: item.section,
              })
            }>
            <Text>
              {item.section} {item.sectionHeader}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default BrowseCCScreen;
