import './Input.css';

const Input = ({
  elementOption,
  className,
  id,
  label,
  type,
  placeholder,
  rows,
}) => {
  const element =
    elementOption === 'input' ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );
  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={id}>{label}</label>
      {element}
    </div>
  );
};

export default Input;
