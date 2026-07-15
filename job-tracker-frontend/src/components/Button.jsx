import PropTypes from "prop-types";

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-300 text-gray-900 hover:bg-gray-400 focus:ring-gray-400",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
  ]),
  type: PropTypes.oneOf([
    "button",
    "submit",
    "reset",
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;