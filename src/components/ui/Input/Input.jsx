import s from './Input.module.scss';

const Input = ({
  id,
  type,
  name,
  placeholder,
  autoComplete,
  autoFocus = false,
  onChange,
  value = '',
}) => {
  return (
    <>
      {onChange ? (
        <input
          className={s.input}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          className={s.input}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
        />
      )}
    </>
  );
};

export default Input;
