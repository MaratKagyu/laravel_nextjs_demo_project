import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "@/store";
import API, {apiEndpoint, ApiErrorData} from "@/tool/API";

export const login = createAsyncThunk<
  { accessToken: string },
  { email: string; password: string; },
  { rejectValue: ApiErrorData }
>(
  "account/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        apiEndpoint.authenticate,
        { email, password }
      );
      const accessToken = response.data.token;

      return {
        accessToken,
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);

export const loadAccountData = createAsyncThunk<
  { id: number, name: string, email: string, },
  {},
  { state: RootState }
>(
  "account/loadAccountData",
  async (_, { rejectWithValue }) => {
    try {
      const accountResponse = await API.get(apiEndpoint.account);

      const accountData: {
        id: number,
        name: string,
        email: string,
      } = accountResponse.data;
      return {
        ...accountData,
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue({
        errorCode: 'invalid_credentials',
        response: error.response.data,
      });
    }
  }
);
