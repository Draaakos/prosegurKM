import { useEffect, useState } from 'react';
import css from './index.css';
import Modal from 'ui/Modal';
import logService from '../../services/log.service.js';
import carService from '../../services/car.service.js';


const NewCar = () => {
  const [carTypes, setCarTypes] = useState([]);

  useEffect(() => {
    carService.fetchCarTypes().then(response => setCarTypes(response.car_types));
  }, []);

  const [carData, setCarData] = useState({
    ppu: '',
    type: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!carData.ppu || !carData.type) {
        console.error('PPU y tipo de coche son requeridos.');
        return;
    }

    const jsonData = {
      ppu: carData.ppu,
      car_type: carData.type,
      mileage: carData.mileage || 0,
      mileage_preventive_limit: carData.mileage_preventive_limit || 0,
      mileage_preventive_notification: carData.mileage_preventive_notification || 5000,
      service: carData.service || 1
    };

    carService.addCar(jsonData)
      .then(response => {
          if (response.errors) {
              console.error('Error:', response.errors);
          } else {
              console.log('Success:', response);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  };

  return (
    <form className={css.new_car_form} onSubmit={handleSubmit}>
      <h1 className={css.form_title}>Agregar Nuevo Vehículo</h1>
      <div className={css.form_group}>
        <label htmlFor="ppu" className={css.form_label}>PPU</label>
        <input
          type="text"
          id="ppu"
          name="ppu"
          value={carData.ppu}
          onChange={handleChange}
          className={css.form_input}
          placeholder="Enter PPU"
          required
        />
      </div>
      <div className={css.form_group}>
        <label htmlFor="type" className={css.form_label}>Type</label>
        <select
          id="type"
          name="type"
          value={carData.type}
          onChange={handleChange}
          className={css.form_input}
          required
        >
          <option value="" disabled>Select Type</option>
          {carTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div className={css.form_group}>
        <label htmlFor="date" className={css.form_label}>Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={carData.date}
          onChange={handleChange}
          className={css.form_input}
          required
        />
      </div>
      <button type="submit" className={css.submit_button}>Add Car</button>
    </form>
  );
};


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
      { isActiveNewCar && <Modal onClose={() => setIsActiveNewCar(false)}><NewCar /></Modal> }

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
