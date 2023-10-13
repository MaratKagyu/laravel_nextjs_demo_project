"use client";
import React, {useCallback, useState} from 'react';
import classes from './Accordion.module.scss';
import clsx from "clsx";

const Accordion: React.FC<{
  children: React.ReactNode|React.ReactNode[]|string,
  title: string,
}>= (
  {
    children,
    title
  }
) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = useCallback(() => {
    setIsExpanded((value) => !value);
  }, []);
  return (
    <div className={classes.Accordion}>
      <button
        onClick={toggleExpand}
        className={classes.Accordion__Title}
      >
        <div className={classes.Accordion__TitleText}>
          {title}
        </div>
        <div
          className={clsx({
            [classes.Accordion__ExpandIcon]: true,
            [classes.Accordion__ExpandIcon_collapsed]: !isExpanded,
          })}
        />
      </button>
      <div className={clsx({
        [classes.Accordion__Body]: true,
        [classes.Accordion__Body_hidden]: !isExpanded,
      })}>
        {children}
      </div>
    </div>
  )
}

export default Accordion;
