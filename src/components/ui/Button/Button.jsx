import s from './Button.module.scss';

const Button = ({ type, method, children }) => {
  return (
    <button className={s.button} type={type} onClick={method || null}>
      {children}
    </button>
  );
};

export default Button;
