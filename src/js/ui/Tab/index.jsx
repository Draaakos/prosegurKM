import { useState } from 'react';
import classNames from 'classnames';
import css from './index.css';

const TabHeader = ({ list, onSelectTab, idxActive }) => {
  return (
    <div className={css.tabHeader}>
      {
        list.map((item, idx) => {
          const classes = classNames({
            [css.tabHeader__item]: true,
            [css.tabHeader__item__active]: idx == idxActive
          })

          return (
            <div
              onClick={onSelectTab(idx)}
              className={classes}
            >
              {item}
            </div>
          )
        })
      }
    </div>
  );
};

const TabBody = ({ children}) => {
  return (
    <div className={css.tabBody}>
      {children}
    </div>
  )
}

const Tab = ({ optionList, children }) => {
  const [ tabSelected, setTabSelected ] = useState(0);

  const onSelectTab = (idx) => {
    return () => {
      setTabSelected(idx);
    }
  };

  return (
    <div className={css.tab}>
      <TabHeader
        list={optionList}
        onSelectTab={onSelectTab}
        idxActive={tabSelected}
      />
      <TabBody>
        {children[tabSelected]}
      </TabBody>
    </div>
  );
};

export default Tab;
