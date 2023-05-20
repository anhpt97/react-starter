import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LIMIT } from 'src/constants/pagination';
import { getRowLimit, setRowLimit } from 'src/utils/localStorage';

const limit = getRowLimit() || DEFAULT_LIMIT;

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    limit,
  },
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
      setRowLimit(action.payload);
    },
  },
});

export const { setLimit } = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
