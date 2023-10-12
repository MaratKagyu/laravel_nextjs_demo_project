import React from 'react';
import classes from './VerticalLayout.module.scss';

const VLScrollableContent: React.FC<{
  children: React.ReactNode|React.ReactNode[]|string
}> = ({ children }) => {
  return (
    <div className={classes.VLScrollableContent}>
      {children}
    </div>
  )
};

export default VLScrollableContent;

