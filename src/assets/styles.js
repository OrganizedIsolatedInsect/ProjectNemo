import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
  //This section for Title/Icon setup
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,

    height: 50,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  col1: {
    flex: 0.6,
  },
  col2: {
    flex: 0.4,
  },
  text: {
    textAlign: 'right',
  },
  //end Title/Icon setup
  primary: {
    color: '#7F2025',
  },
  secondary: {
    color: '#053C5E',
  },
  neutral: {
    color: '#616362', //'#E6E6E6' orig
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
  sectionDivider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15
  },
  filterBox: {
    borderColor: '#dff0e3',
    borderWidth: 1,
  },
  filterButton: {
    flex: 0.25,
    width: '30%',
    fontFamily: 'Lato-Regular',
    fontWeight: 'Bold',
    color: '#E6E6E6',
    tintColor: '7F2025',
    fontSize: 12,
    padding: 20,
    borderRadius: 25,
    borderColor: '#7F2025',
  },
});
