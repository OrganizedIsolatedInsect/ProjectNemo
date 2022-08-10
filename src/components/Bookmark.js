import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Bookmark = () => {
  const [marked, setMarked] = useState(false); // Preps icon for state chagne

  //switches state of bookmark
  const switchMarks = () => {
    setMarked(!marked);
  };

  return (
    <Pressable onPress={() => switchMarks()}>
      <View>
        
        <Ionicons name={marked ? 'bookmark' : 'bookmark-outline'} size={30} />
      </View>
    </Pressable>
  );
};

export default Bookmark;


