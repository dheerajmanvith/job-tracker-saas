import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    error,
    ...props
  },
  ref
) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        ref={ref}
        type={type}
        {...props}
      />

      {error && (
        <p className="error">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;