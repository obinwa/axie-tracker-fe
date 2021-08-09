const Input = ({
  onblur,
  label,
  value,
  disabled,
  onchange,
  options,
  elementType,
  svg,
  placeholder,
  type,
  readonly,
  valid,
  msg,
}) => {
  let inputElement;
  switch (elementType) {
    case "input":
      inputElement = svg ? (
        <div className="form__svg">
          <input
            onBlur={onblur}
            id={label}
            className="form__input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            name={label}
            disabled={readonly}
            required
          />
          <img src={svg} alt="alt" />
        </div>
      ) : (
        <input
          onBlur={onblur}
          id={label}
          className={"form__input form__input-nosvg"}
          value={value}
          onChange={onchange}
          placeholder={placeholder}
          name={label}
          type={type}
          disabled={readonly}
          required
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onBlur={onblur}
          id={label}
          className={"form__input form__input-nosvg"}
          value={value}
          onChange={onchange}
          rows={4}
          placeholder={placeholder}
          name={label}
          required
          style={{ resize: "none" }}
          readOnly={readonly}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select
          value={value}
          onChange={onchange}
          onBlur={onblur}
          id={label}
          required
          className={"form__input form__input-nosvg"}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          onBlur={onblur}
          id={label}
          value={value}
          onChange={onchange}
          name={label}
          //   className="form-input"
          className={"form__input form__input-nosvg"}
          required
        />
      );
      break;
  }

  return (
    <div className="form__group">
      <label className="form__label" htmlFor={label}>
        {label}
      </label>
      {inputElement}
      {(msg !== "" || !valid) && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
};

export default Input;
