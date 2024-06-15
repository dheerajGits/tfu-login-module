import React from "react";
export default function Input({ type, placeholder, name, register, errors, rules, label, className, disabled, outerclassName, ...rest }: {
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
}): React.JSX.Element;
