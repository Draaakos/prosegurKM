import Box from 'ui/Box';
import Row from './Row';
import Days from './Days';
import css from './index.css';

const CarTable = ({ data, actions }) => {
  const cars = data
    .map(car => {
      return (
        <div>
          <Row car={car} />
          <Days car={car} actions={actions} />
        </div>
      )
    });
  return (
    <Box>
      <div className={css.table}>
        {cars}
      </div>
    </Box>
  );
};

export default CarTable;
