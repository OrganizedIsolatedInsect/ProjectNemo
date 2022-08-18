import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#7F2025',
  secondary: '#053C5E',
  neutral: '#E6E6E6',
  accent_1: '#1F7ABC',
  accent_2: '#CB333B',
};

export default StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading_1: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  heading_2: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.primary,
  },
  body: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 14,
  },

  //Styling specifically for the Searchbar component.
  searchView_Styling: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchBar_Styling: {
    position: 'relative',
    zIndex: 1,
    // marginTop: 10,
    // flex: 1,
    width: '80%',
    borderColor: colors.neutral,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 45,
    backgroundColor: colors.neutral,
    marginLeft: 15,
  },
  searchIcon_styling: {
    position: 'absolute',
    zIndex: 1,
    left: 25,
    bottom: 10,
  },
  closeIcon_styling: {
    // marginTop: 18,
    marginLeft: 7,
    marginRight: 15,
    // height: 50
  },
  closeIcon_pressable_styling: {
    paddingLeft: 5,
    paddingTop: 10,
    height: '100%',
  },
  closeIcon_ripple_styling: {
    // color: 'blue',
    // borderless: 'true',
    radius: 25,
  },
  // SEARCHBAR Styling END

  // Search Results Flatlist Styling
  searchResultsFlatList_ItemView: {padding: 10},
  searchResultsFlatList_ItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: colors.neutral,
  },
});
