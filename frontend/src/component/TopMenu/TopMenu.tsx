"use client";
import React, {useCallback, useMemo, useRef, useState} from 'react';
import classes from './TopMenu.module.scss';
import clsx from "clsx";
import useOnClickOutside from "@/hook/useOnClickOutside";
import Link from "next/link";
import useAccountData from "@/hook/useAccountData";
import {useAppDispatch} from "@/hook/store-hooks";
import {accountCleanup} from "@/store/account/account-slice";

export interface TopMenuItem {
  name: string, // if name === '-' - it'll show up as separator
  icon?: string,
  url?: string|null,
  onClick?: (() => any),
}

const TopMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const accountData = useAccountData();
  const componentRef = useRef<HTMLDivElement|null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMenuClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [
    isExpanded
  ]);

  const hideMenu = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const itemList: TopMenuItem[] = useMemo(() => {
    if (accountData.id) {
      return [
        {
          name: 'Dashboard',
          url: '/',
        },
        {
          name: '-', // separator
        },
        {
          name: 'Logout',
          onClick: () => {
            dispatch(accountCleanup());
            setIsExpanded(false);
          },
        }
      ];
    } else {
      // If not logged in
      return [
        {
          name: 'About',
          url: '/about',
        },
        {
          name: '-', // separator
        },
        {
          name: 'Sign in',
          url: '/login',
        },
      ];
    }
  }, [accountData, dispatch]);

  const accountLogoText = useMemo(() => {
    if (!accountData.name) {
      return '';
    }
    const words = accountData.name.split(' ');
    return (
      (words[0]?.substring(0, 1).toUpperCase() || '')
      + (words[1]?.substring(0, 1).toUpperCase() || '')
    )

  }, [accountData]);

  useOnClickOutside(componentRef, hideMenu);

  return (
    <div ref={componentRef}  className={classes.TopMenu}>
      <div className={classes.TopMenu__Logo}>
        {(!accountData.id) && (
          <div
            className={clsx({
              [classes.TopMenu__LogoImage]: true,
              [classes.TopMenu__LogoLoading]: accountData.isLoading,
            })}
          />
        )}
        {(!!accountData.id) && (
          <div className={classes.TopMenu__LogoName}>
            {accountLogoText}
          </div>
        )}
      </div>
      <button
        onClick={handleMenuClick}
        className={clsx({
          [classes.TopMenu__Button]: true,
          [classes.TopMenu__Button_active]: isExpanded,
        })}
      />
      <div
        className={clsx({
          [classes.TopMenu__DropDown]: true,
          [classes.TopMenu__DropDown_hidden]: !isExpanded,
        })}
      >
        {itemList.map((itemData, itemIdx) => (
          <React.Fragment key={itemIdx}>
            {/* If it's a separator */}
            {(itemData.name === '-') && (
              <em className={classes.TopMenu__Separator}/>
            )}

            {/* If it's a link with URL */}
            {((itemData.name !== '-') && (!!itemData.url)) && (
              <Link
                href={itemData.url}
                onClick={hideMenu}
                className={classes.TopMenu__Link}
              >
                {itemData.name}
              </Link>
            )}

            {/* If it's a button with onClick */}
            {((itemData.name !== '-') && (!itemData.url)) && (
              <button
                onClick={itemData.onClick}
                className={classes.TopMenu__Link}
              >
                {itemData.name}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default TopMenu;
