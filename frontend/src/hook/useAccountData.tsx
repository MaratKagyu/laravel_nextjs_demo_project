import AccountInterface from "@/type/user/AccountInterface";
import {useAppDispatch, useAppSelector} from "@/hook/store-hooks";
import {selectAccountData} from "@/store/account/account-selectors";
import {useEffect} from "react";
import {loadAccountData} from "@/store/account/account-thunks";

const useAccountData = (): AccountInterface => {
  const dispatch = useAppDispatch();
  const accountData = useAppSelector(selectAccountData);

  useEffect(() => {
    if (accountData.id || (accountData.isLoading) || (!accountData.accessToken)) {
      return;
    }
    dispatch(loadAccountData({}));
  }, [accountData, dispatch]);
  return accountData;
};

export default useAccountData;
