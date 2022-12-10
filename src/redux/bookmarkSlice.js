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
      const reduxPassKey = action.payload.passingKey;
      const reduxLawType = action.payload.lawType;
      console.log(state.bookmarkArray);
      console.log('redux ' + reduxPassKey);
      console.log('redux ' + reduxLawType);
      state.bookmarkArray = state.bookmarkArray.filter(
        item =>
          item.passingKey !== reduxPassKey && item.lawType !== reduxLawType,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
