import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
  primary: {
    color: '#7F2025',
  },
  secondary: {
    color: '#053C5E',
  },
  neutral: {
    color: '#E6E6E6',
  },
  accent_1: {
    color: '#1F7ABC',
  },
  accent_2: {
    color: '#CB333B',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
  },
  heading_1: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  heading_2: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#7F2025',
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
    flex: 1,
    width: '80%',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 45,
    backgroundColor: '#e6e6e6',
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
});
