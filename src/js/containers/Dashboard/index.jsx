import { useState } from "react";
import Wrapper from "ui/Wrapper";
import Modal from "ui/Modal";
import CarTable from "./Components/CarTable";
import KilometerForm from "./Components/KilometerForm";
import useDashboard from "./useDashboard.js";
import css from "./index.css"



const Dashboard = () => {
  const { states, actions } = useDashboard();

  return (
    <Wrapper>
      { states.mileageModalActive
        && (
          <Modal onClose={actions.setMileageModalActive}>
            <KilometerForm
              day={states.dayActive}
              car={states.carActive}
            />
          </Modal>
        )
      }

      <div className={css.content}>
        <h1 className={css.title}>Camionetas PROSEGUR</h1>
        { states.cars.length && <CarTable data={states.cars} actions={actions} /> }
      </div>
    </Wrapper>
  );
};

export default Dashboard;
