import css from './index.css';

const LeftBar = () => {
  return (
    <div className={css.left_bar}>
      <div>
        <div>Vehiculos</div>
      </div>
    </div>
  );
};

const Wrapper = ({ children }) => {
  return(
    <div className={css.wrapper}>
      <div>
        <LeftBar />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
