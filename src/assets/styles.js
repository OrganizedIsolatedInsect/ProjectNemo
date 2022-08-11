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
    backgroundColor: 'white',
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
});
