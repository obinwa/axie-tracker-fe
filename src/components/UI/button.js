const Button = ({ children, svg, bgColor, onclick, type }) => {
  return (
    <button
      onClick={onclick}
      type={type}
      className={["button", bgColor].join(" ")}
    >
      {svg && <img src={svg} alt="button" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
