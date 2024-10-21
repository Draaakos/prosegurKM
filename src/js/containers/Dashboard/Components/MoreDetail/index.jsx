import { useContext } from 'react';
import Tab from 'ui/Tab';
import { DashboardContext } from '../../context.js';
import css from './index.css';
import Resume from './Resume/index.jsx';
import Document from './Document/index.jsx';
import Stamp from './Stamp/index.jsx';



const MoreDetail = () => {
  const { states, actions } = useContext(DashboardContext);

  return (
    <div className={css.moreDetail}>
      <h3 className={css.moreDetail__title}>PPU: {states.carActive.ppu}</h3>

      <Tab optionList={['Resumen', 'Documentos', 'Sellos']}>
        <Resume />
        <Document />
        <Stamp />
      </Tab>
    </div>
  );
};

export default MoreDetail;
