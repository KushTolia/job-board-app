import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely load from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('jobBoardFavoriteIds');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load favorites from storage", e);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: loadFavoritesFromStorage(),
  },
  reducers: {
    // This is the only reducer we need. It's a "toggle" function.
    toggleFavorite: (state, action) => {
      const jobId = action.payload;
      if (state.ids.includes(jobId)) {
        state.ids = state.ids.filter(id => id !== jobId);
      } else {
        state.ids.push(jobId);
      }
      // Save the new state to localStorage
      localStorage.setItem('jobBoardFavoriteIds', JSON.stringify(state.ids));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
// Selector to easily check if a job is favorited
export const selectIsFavorited = (state, jobId) => state.favorites.ids.includes(jobId);

export default favoritesSlice.reducer;
