import PropTypes from "prop-types";

function Badge({
  children,
  color = "blue",
  size = "md",
  rounded = "full",
  className = "",
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
    purple: "bg-purple-100 text-purple-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const roundedStyles = {
    none: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-medium
        transition-colors
        duration-200
        ${colors[color]}
        ${sizes[size]}
        ${roundedStyles[rounded]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "blue",
    "green",
    "yellow",
    "red",
    "gray",
    "purple",
    "indigo",
  ]),
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),
  rounded: PropTypes.oneOf([
    "none",
    "md",
    "lg",
    "full",
  ]),
  className: PropTypes.string,
};

export default Badge;