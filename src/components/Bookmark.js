import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Bookmark = () => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  return (
    <Pressable onPress={() => switchMarks()}>
      <View>
        
        <Icon name={marked ? 'bookmark' : 'bookmark-outline'} size={30} />
      </View>
    </Pressable>
  );
};

export default Bookmark;


//SOURCE for bookmark state change:  https://stackoverflow.com/questions/42451214/react-native-change-icon-color-on-press