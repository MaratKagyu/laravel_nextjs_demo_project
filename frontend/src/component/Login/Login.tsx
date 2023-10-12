"use client";
import React, {useCallback, useEffect, useState} from 'react';
import classes from './Login.module.scss';
import FormButton from "@/component/Form/FormButton/FormButton";
import useAccountData from "@/hook/useAccountData";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/hook/store-hooks";
import {login} from "@/store/account/account-thunks";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const accountData = useAccountData();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    dispatch(login({ email, password })).then((result: any) => {
      setIsLoggingIn(false);
      if (result.payload?.errorCode) {
        switch (result.payload.errorCode) {
          case 'invalid_credentials': return setError('Invalid credentials');
        }
      }
    });
  }, [email, password, dispatch]);

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, []);

  // If the user is authenticated, then redirect to the dashboard
  useEffect(() => {
    if (accountData.id) {
      router.push('/');
    }
  }, [router, accountData]);

  return (
    <div className={classes.Login}>
      <header className={classes.Login__Header}>Sign In</header>
      <form onSubmit={handleSubmit}>
        {(!!error) && (
          <p className={classes.Login__Error}>
            {error}
          </p>
        )}

        <label>
          <span>Email:</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>

        <div className={classes.Login__Buttons}>
          <FormButton
            type="submit"
            size="wide"
            style="primary"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Signing In...' : 'Sign In'}
          </FormButton>
        </div>
      </form>
    </div>
  )
};

export default Login;
