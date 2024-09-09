import css from './index.css';

const Box = ({ children }) => {
  return (
    <div className={css.box}>
      {children}
    </div>
  )
};

export default Box;
