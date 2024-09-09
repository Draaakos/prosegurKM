import css from './index.css';


const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.label}>Dashboard</div>
      <div className={css.label}>Caballos</div>
      <div className={css.label}>Entrenadores</div>
      <div className={css.label}>Jinetes</div>
    </div>
  )
};


export default Sidebar;
