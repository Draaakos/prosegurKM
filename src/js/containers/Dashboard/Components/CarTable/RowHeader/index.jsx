import css from './index.css';


const RowHeader = ({ list }) => {
  const items = list.map(item => <div>{item}</div>);

  return (
    <div className={css.row}>
      {items}
    </div>
  )
};


export default RowHeader;
