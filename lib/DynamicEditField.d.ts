/// <reference types="react" />
import * as React from "react";
export declare enum DynamicEditFieldMode {
    Static = 0,
    Edit = 1,
}
export interface IDynamicEditFieldProps {
    initialValue: any;
    style?: any;
    canEditFailMessage?: string;
    placeHolder?: string;
    canEditFunction?(): boolean;
    canAcceptFunction?(value: string): boolean;
    acceptFunction?(value: string): Promise<boolean>;
    filterFunction?(proposedValue: string): any;
    feedbackFunction?(proposedValue: string): any;
    formatFunction?(value: any, mode: DynamicEditFieldMode): string;
    onEditModeChanged?(mode: DynamicEditFieldMode): void;
}
export interface IDynamicEditFieldState {
    initialPropValue?: any;
    value?: any;
    mode?: DynamicEditFieldMode;
    showEditFail?: boolean;
    feedback?: string;
}
export declare class DynamicEditField extends React.Component<IDynamicEditFieldProps, IDynamicEditFieldState> {
    constructor(props: IDynamicEditFieldProps);
    private onEdit;
    private onCancelEdit;
    private onCanAcceptEdit();
    private onAcceptEdit();
    private onValueChanged;
    private format;
    private overlayControl;
    componentWillReceiveProps(props: IDynamicEditFieldProps): void;
    readonly staticValueDisplay: any;
    render(): JSX.Element;
}
