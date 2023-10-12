import React from 'react';
import styles from './FormButton.module.scss';
import clsx from "clsx";
import Link from "next/link";

interface FormButtonProps {
  type: 'submit' | 'button' | 'link';
  style?: 'primary' | 'neutral' | 'danger' | 'success';
  size?: 'wide' | 'normal' | 'small' | 'tiny';
  value?: string|number;
  href?: string;
  onClick?: (eventData: React.MouseEvent<HTMLButtonElement>) => any;
  children?: any;
  disabled?: boolean;
  isLoading?: boolean;
}

const FormButton: React.FC<FormButtonProps> = (
  {
    type,
    style,
    size,
    value,
    href,
    onClick,
    children,
    disabled,
    isLoading
  }
) => {
  const classNames = (() => {
    const classNames = {
      [styles.FormButton]: true
    };

    switch (size) {
      case 'wide':
        classNames[styles.FormButton_wide] = true;
        break;

      case 'tiny':
        classNames[styles.FormButton_tiny] = true;
        break;

      case 'small':
        classNames[styles.FormButton_small] = true;
        break;

      case 'normal':
      default:
        classNames[styles.FormButton_normal] = true;
        break;
    }

    if (isLoading) {
      classNames[styles.FormButton_loading] = true;
    } else if (disabled) {
      classNames[styles.FormButton_disabled] = true;
    } else {
      switch (style) {
        case 'primary':
          classNames[styles.FormButton_primary] = true;
          break;

        case 'success':
          classNames[styles.FormButton_success] = true;
          break;

        case 'danger':
          classNames[styles.FormButton_danger] = true;
          break;

        case 'neutral':
        default:
          classNames[styles.FormButton_neutral] = true;
          break;
      }
    }

    return classNames;
  })();

  if (isLoading || disabled) {
    return (
      <div className={clsx(classNames)}>
        {children}
      </div>
    );
  }

  return (
    (type === 'link') ? (
      <Link href={href || '/'}>
        <a className={clsx(classNames)}>
          {children}
        </a>
      </Link>
    ) : (
      <button
        type={type}
        className={clsx(classNames)}
        disabled={!!disabled}
        value={value}
        onClick={onClick}
      >
        {children}
      </button>
    )
  )
};

export default FormButton;
