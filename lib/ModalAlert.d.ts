/// <reference types="react" />
import * as React from "react";
export declare type ModalAlertStyle = "default" | "success" | "info" | "warning" | "danger";
export interface IModalAlertProps {
    show: boolean;
    style?: ModalAlertStyle;
    header?: React.Component<any, any> | string;
    message?: React.Component<any, any> | string;
    canCancel?: boolean;
    acknowledgeContent?: React.Component<any, any> | string;
    onCancel?(): void;
    onAcknowledge?(): void;
}
export interface IModalAlertState {
}
export declare class ModalAlert extends React.Component<IModalAlertProps, IModalAlertState> {
    private renderHeader();
    private renderAcknowledge(alertStyle);
    render(): JSX.Element;
}
