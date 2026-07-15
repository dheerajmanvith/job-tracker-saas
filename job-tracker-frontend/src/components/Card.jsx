import PropTypes from "prop-types";

function Card({
  children,
  title,
  footer,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-md
        transition-shadow
        duration-200
        hover:shadow-lg
        ${className}
      `}
    >
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-200 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Card;