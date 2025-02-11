import Day from './Day';
import carService from '../../../../../services/car.service.js';
import css from './index.css';

const DayList = ({ data, onClick, currentDate, carId }) => {
  const onGenerateDays = () => {
    const payload = {
      "car": carId,
      "year": currentDate.getFullYear(),
      "month": currentDate.getMonth() + 1
    }

    carService.generateDays(payload).then(response => {
      window.location.reload();
    })
  }

  const days = data.map((day, idx) =>
    <Day
      isEditable={day.is_editable}
      key={`day-${idx}`} day={day}
      onClick={onClick}
    />
  )

  return (
    <div className={css.days}>
      { days.length ? days : <button onClick={onGenerateDays}>Generar días</button> }
    </div>
  )
}

export default DayList;
