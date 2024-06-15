import React from "react";
export type LoginModalProps = {
    color: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccessOtp: () => void;
    logoImg: string;
    apiBaseUrl: string;
    redirectionURL: string;
};
export declare function LoginModal({ color, logoImg, isOpen, onClose, onSuccessOtp, redirectionURL, apiBaseUrl, }: LoginModalProps): React.JSX.Element;
