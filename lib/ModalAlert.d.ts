/// <reference types="react-bootstrap" />
/// <reference types="react" />
import * as React from "react";
import { Sizes } from "react-bootstrap";
export declare type ModalAlertStyle = "default" | "success" | "info" | "warning" | "danger";
export interface IModalAlertProps {
    modalId?: string;
    show: boolean;
    style?: ModalAlertStyle;
    bsSize?: Sizes;
    header?: React.Component<any, any> | string;
    message?: string;
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
