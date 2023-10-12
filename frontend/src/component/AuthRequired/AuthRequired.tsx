'use client';
import React, {useEffect} from 'react';
import useAccountData from "@/hook/useAccountData";
import {useRouter} from "next/navigation";

const AuthRequired: React.FC<{
  children: React.ReactNode|React.ReactNode[]|string
}> = ({ children }) => {
  const router = useRouter();
  const accountData = useAccountData();

  useEffect(() => {
    if (!accountData.accessToken) {
      router.push('/login');
    }
  }, [accountData, router]);

  return (
    <>
      {(!!accountData.id) && children}
    </>
  )
};

export default AuthRequired;

