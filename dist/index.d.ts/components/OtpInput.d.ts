/// <reference types="react" />
export default function OtpInput({ phone, onOtpSubmit, }: {
    phone: string;
    onOtpSubmit: (otp: any) => void;
}): import("react").JSX.Element;
