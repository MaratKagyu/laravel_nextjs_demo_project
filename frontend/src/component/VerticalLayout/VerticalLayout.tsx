import React from 'react';
import classes from './VerticalLayout.module.scss';

const VerticalLayout: React.FC<{
  children: React.ReactNode|React.ReactNode[]|string
}> = ({ children }) => {
  return (
    <div className={classes.VerticalLayout}>
      {children}
    </div>
  )
};

export default VerticalLayout;
