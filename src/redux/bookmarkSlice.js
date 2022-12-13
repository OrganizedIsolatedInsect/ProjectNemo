import {createSlice} from '@reduxjs/toolkit';

//redux store for boookmarks

const initialState = {
  bookmarkArray: [], //genericize variable as it holds items that are not just "sections"
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkArray.push(action.payload);
    },
    removeBookmark: (state, action) => {
      // state.bookmarkArray = 'this is a test';
      const itemGroup = action.payload;
      const reduxPassKey = itemGroup.passingKey;
      const reduxLawType = itemGroup.lawType;
      const reduxLegGroup = itemGroup.legislationGroup;
      console.log(state.bookmarkArray);
      console.log('redux ' + reduxPassKey);
      console.log('redux ' + reduxLawType);
      console.log(reduxLegGroup);
      state.bookmarkArray = state.bookmarkArray.filter(
        item =>
          item.passingKey !== reduxPassKey &&
          item.lawType !== reduxLawType &&
          item.legislationGroup !== reduxLegGroup,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
