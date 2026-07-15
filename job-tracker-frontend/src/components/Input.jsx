import PropTypes from "prop-types";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full rounded-lg border border-gray-300
          px-4 py-2
          outline-none
          transition
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          disabled:text-gray-500
          ${className}
        `}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "date",
    "search",
    "tel",
    "url",
  ]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;