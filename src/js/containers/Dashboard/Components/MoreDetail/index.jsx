import { useContext } from 'react';
import Tab from 'ui/Tab';
import { DashboardContext } from '../../context.js';
import css from './index.css';
import Resume from './Resume/index.jsx';
import Document from './Document/index.jsx';
import Stamp from './Stamp/index.jsx';
import Notification from './Notification/index.jsx';



const MoreDetail = () => {
  const { states } = useContext(DashboardContext);

  return (
    <div className={css.moreDetail}>
      <h3 className={css.moreDetail__title}>PPU: {states.carActive.ppu}</h3>

      <Tab optionList={['Resumen', 'Documentos', 'Sellos', 'Notificaciones']}>
        <Resume />
        <Document />
        <Stamp />
        <Notification />
      </Tab>
    </div>
  );
};

export default MoreDetail;
