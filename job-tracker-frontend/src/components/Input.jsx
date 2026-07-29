import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      error,
      ...props
    },
    ref
  ) => {

    const id =
      props.name ||
      label.toLowerCase().replace(" ", "-");


    return (
      <div className="input-group">

        <label htmlFor={id}>
          {label}
        </label>


        <input
          id={id}
          ref={ref}
          {...props}
        />


        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </div>
    );
  }
);


export default Input;