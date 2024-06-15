import React from "react";

export default function Input({
  type,
  placeholder,
  name,
  register,
  errors,
  rules,
  label,
  className,
  disabled = false,
  outerclassName,
  ...rest
}: {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  errors: any;
  rules?: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  outerclassName?: string;
}) {
  return (
    <div className={`max-md:w-72 ${outerclassName}`}>
      {label && (
        <label>
          {label} {rules?.required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${errors[name] && "input-invalid"} ${className}`}
        disabled={disabled}
        {...register(name, rules)}
        {...rest}
      />
      {errors[name] && (
        <small className="mt-1.5 text-red-600 block">
          {errors[name].message || "This field is required"}
        </small>
      )}
    </div>
  );
}
