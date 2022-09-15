import {StyleSheet} from 'react-native';

export const colors = {
  primary: '#7F2025',
  secondary: '#053C5E',
  neutral: '#E6E6E6',
  accent_1: '#1F7ABC',
  accent_2: '#CB333B',
  backgroundColoring: '#FFFFFF',
  borderColoring: '#000000',
  highlightBgColor: '#829DAF',
  highlightColor: '#FFFFFF',
  primaryText: '#000000',
};

export default StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColoring,
  },
  headerText: {
    fontFamily: 'Lato-Regular',
    fontSize: 30,
  },
  headerViewStyle: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderBottomColor: colors.borderColoring,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    flexDirection: 'row',
  },
  container: {
    paddingTop: 0,
    paddingHorizontal: 18,
    marginBottom: 2,
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: colors.borderColoring,
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
    borderColor: colors.primary,
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
  },
  paragraph: {
    paddingLeft: 20,
  },
  subParagraph: {
    paddingLeft: 35,
  },
  CCcontent: {
    height: 600,
  },

  //SEARCHBAR Styling START
  searchView_Styling: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchBar_Styling: {
    position: 'relative',
    zIndex: 1,
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
    marginLeft: 7,
    marginRight: 15,
  },
  closeIcon_pressable_styling: {
    paddingLeft: 5,
    paddingTop: 10,
    height: '100%',
  },
  closeIcon_ripple_styling: {
    radius: 25,
  },
  // SEARCHBAR Styling END

  // Search Results Flatlist Styling START
  searchResultsFlatList_ItemView: {
    paddingBottom: 15,
    paddingLeft: 15,
  },
  searchResultsFlatList_ItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: colors.neutral,
  },
  searchResultsHighlight: {
    color: colors.highlightColor,
    backgroundColor: colors.highlightBgColor,
  },
  // Search Results Flatlist Styling END

  //Section List for Browse MVA screen
  sectionListTitle: {
    backgroundColor: colors.backgroundColoring,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    marginHorizontal: 11,
    marginBottom: 0,
    borderRadius: 10,
  },
  centerOnScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  alignOnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  //GRID LIST ITEMS
  gridListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleMargin: {
    marginTop: 10,
  },
  gridItemMargin: {
    flexDirection: 'row',

    marginLeft: 15,
    marginBottom: 10,
  },
  rowSplit: {
    width: '20%',
  },
  sentenceWrap: {
    flexWrap: 'wrap',
  },
});
