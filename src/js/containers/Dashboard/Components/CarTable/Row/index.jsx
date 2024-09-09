import css from './index.css';


const Row = ({ car }) => {
  return (
    <div className={css.row}>
      <div>{car.ppu}</div>
      <div>{car.type}</div>
      <div>{car.mileage}</div>
      <div>{car.mileage_limit}</div>
      <div>{car.service}</div>
    </div>
  )
};


export default Row;
