import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  blogs?: any[];
}

interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  busy: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(authState, { payload }: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateBusyState(authState, { payload }: PayloadAction<boolean>) {
      authState.busy = payload;
    },
    clearProfile(authState) {
      authState.profile = null;
    },
  },
});

export const {
  updateLoggedInState,
  updateProfile,
  updateBusyState,
  clearProfile,
} = slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state,
  ({ auth }: any) => auth
);

export default slice.reducer;
