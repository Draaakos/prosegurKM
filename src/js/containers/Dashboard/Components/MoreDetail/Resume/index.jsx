import { useContext } from 'react';
import carService from '../../../../../services/car.service.js';
import { DashboardContext } from '../../../context.js';
import css from './index.css';


const Resume = () => {
  const { states } = useContext(DashboardContext);

  const onDeleteCar = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este automóvi?')) {
      carService.deleteCar(states.carActive.id).then(() => window.location.reload());
    }
  }

  return (
    <div>
      <div>Sellos: {states.carActive.stamps.length}</div>
      <div>Documentos: {states.carActive.documents.length}</div>
      <div>Estado: {states.carActive.service}</div>
      <div className={css.deleteCar} onClick={onDeleteCar}>Eliminar Automóvi</div>
    </div>
  )
};

export default Resume;
