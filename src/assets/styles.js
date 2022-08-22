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
  sectionDivider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,,
    flexDirection: 'row',
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 18,
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
    marginHorizontal: 8,
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
  MVAContentHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  MVAContentHeadingContainerLeft: {
    flex: 1,
    width: '95%',
  },
  MVAContentHeadingContainerRight: {
    alignItems: 'flex-end',
  },
  MVAContentSection: {
    paddingHorizontal: 18,
  },
  MVAContentSectionText: {
    paddingTop: 18,
  },
  MVAContentSubsection: {
    paddingHorizontal: 18,
  },
  MVAContentTicket: {
    paddingHorizontal: 18,
    fontWeight: 'bold',
    fontSize: 15,
  },paragraph: {
    paddingLeft: 20,
  },
  subParagraph: {
    paddingLeft: 35,
  },
  CCcontent: {
    height: 600,
  },
});
