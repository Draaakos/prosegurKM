import { useState } from 'react';
import css from './index.css';
import Modal from 'ui/Modal';


const LeftBar = ({ onActiveModal }) => {
  return (
    <div className={css.left_bar}>
      <div>
        <div className={css.new_car}>
          <div>Vehiculos</div>
          <div className={css.icon} onClick={onActiveModal}>
            <img
              src={`/static/${VERSION}/images/generic/plus-square.svg`}
              alt="nuevo auto"
            />
          </div>
        </div>
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
