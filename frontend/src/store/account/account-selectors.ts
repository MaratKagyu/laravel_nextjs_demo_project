import {RootState} from "@/store";

export const selectAccountData = (state: RootState) => {
  return state.account;
}

