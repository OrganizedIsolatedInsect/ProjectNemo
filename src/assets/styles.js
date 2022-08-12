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
    color: colors.primary,
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
