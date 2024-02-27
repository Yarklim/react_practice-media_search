import s from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={s.spinner}>
      <span className={s.spinnerName}></span>
    </div>
  );
};

export default Spinner;
