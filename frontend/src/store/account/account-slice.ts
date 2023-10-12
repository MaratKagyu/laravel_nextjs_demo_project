import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccountSliceInterface from "@/type/slice/AccountSliceInterface";
import {loadAccountData, login} from "@/store/account/account-thunks";
import StoreAccessToken from "@/tool/StoreAccessToken";

const initialAccountState: AccountSliceInterface = {
  id: null,
  name: 'Anonymous',
  email: '',
  accessToken: StoreAccessToken.get(),
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    setAccessToken: (
      state,
     { payload }: PayloadAction<{accessToken: string}>
    ) => {
      state.accessToken = payload.accessToken;
      StoreAccessToken.save(payload.accessToken)
    },
    accountCleanup: (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = null;
      state.accessToken = null;
      StoreAccessToken.clean();
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = '';
      StoreAccessToken.clean();
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      localStorage.setItem('access_token', payload.accessToken);
    });

    // Load Account Data
    builder.addCase(loadAccountData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadAccountData.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.isLoading = false;
    });
    builder.addCase(loadAccountData.rejected, (state) => {
      state.id = null;
      state.name = 'Anonymous';
      state.email = '';
      state.accessToken = '';
      state.isLoading = false;
      StoreAccessToken.clean();
    });
  }
});

export const {
  setAccessToken,
  accountCleanup,
} = accountSlice.actions;

export default accountSlice.reducer;
