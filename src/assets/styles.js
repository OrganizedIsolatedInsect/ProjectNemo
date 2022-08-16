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
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 50,
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: 'black',
  },
  innerContainerLeft: {
    paddingVertical: 9,
    flex: 1,
    width: '70%',
  },
  innerContainerRight: {
    alignItems: 'flex-end',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  buttonAct: {
    borderRadius: 25,
    borderColor: '#7F2025',
    borderWidth: 1,
    width: 120,
    padding: 5,
  },
  buttonActText: {
    fontFamily: 'Lato-Regular',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

});
