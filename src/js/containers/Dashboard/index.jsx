import Wrapper from "ui/Wrapper";
import Modal from "ui/Modal";
import CarTable from "./Components/CarTable";
import KilometerForm from "./Components/KilometerForm";
import MoreDetail from "./Components/MoreDetail";
import useDashboard from "./useDashboard.js";
import { DashboardContext } from "./context.js";
import css from "./index.css";


const Dashboard = () => {
  const { states, actions } = useDashboard();

  return (
    <DashboardContext.Provider value={{ states, actions }}>
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

        {
          states.isMoreDetailsModalActive
          && (
            <Modal onClose={actions.setIsMoreDetailsModalActive}>
              <MoreDetail />
            </Modal>
          )
        }

        <div className={css.content}>
          <h1 className={css.title}>Camionetas PROSEGUR</h1>
          { states.cars.length && <CarTable data={states} actions={actions} /> }
        </div>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
