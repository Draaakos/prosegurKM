import { useEffect, useState } from 'react';
import css from './index.css';
import Modal from 'ui/Modal';
import logService from '../../services/log.service.js';


const Log = ({ data }) => {
  return (
    <div className={css.log}>
      <div>{data.ppu}</div>
      <div>{data.type}</div>
      <div>{data.date}</div>
    </div>
  )
};


const LeftBar = ({ onActiveModal }) => {
  const [ logs, setLogs ] = useState([]);

  useEffect(() => {
    logService.fetchLogs()
      .then((response => {
        setLogs(response.logs)
      }));
  }, []);

  return (
    <div className={css.left_bar}>
      <div>
        <div className={css.new_car}>
          <div>Vehículos</div>
          <div className={css.icon} onClick={onActiveModal}>
            <img
              src={`/static/${VERSION}/images/generic/plus-square.svg`}
              alt="nuevo auto"
            />
          </div>
        </div>
      </div>

      <div className={css.logs}>
        <div className={css.logs__title}>Notificaciones</div>
        {logs.map((log, idx) => <Log key={`log-${idx}`} data={log} />)}
      </div>
    </div>
  );
};

const Wrapper = ({ children }) => {
  const [ isActiveNewCar, setIsActiveNewCar ] = useState(false);

  return(
    <div className={css.wrapper}>
      { isActiveNewCar && <Modal onClose={() => setIsActiveNewCar(false)} /> }

      <div>
        <LeftBar onActiveModal={() => setIsActiveNewCar(true)}/>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
