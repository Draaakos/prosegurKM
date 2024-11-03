import Box from 'ui/Box';
import RowHeader from './RowHeader';
import Row from './Row';
import Days from './Days';
import css from './index.css';

const CarTable = ({ data, actions }) => {
  const cars = data.filterCars
    .map((car, idx) => {
      return (
        <div className={css.row_car} key={`car-${idx}`}>
          <Row
            car={car}
            serviceOptions={data.serviceOptions}
            onActiveDetails={actions.onActiveDetails}
          />
          <Days car={car} actions={actions} />
        </div>
      )
    });

  return (
    <Box>
      <div className={css.table}>
        <RowHeader list={[ "PPU", "Tipo", "KM. Actual", "KM Preventivo", "KM. Restante", "Estado", "Sellos", "Detalles" ]} />
        {cars}
      </div>
    </Box>
  );
};

export default CarTable;
