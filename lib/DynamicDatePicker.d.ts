/// <reference types="react" />
import * as React from "react";
export declare enum DynamicDatePickerMode {
    Static = 0,
    Edit = 1,
}
export interface IDynamicDatePickerProps {
    initialValue: Date;
    isDeferredEditMode?: boolean;
    onChangeDate?(date: Date): void;
}
export interface IDynamicDatePickerState {
    initialPropValue?: any;
    value?: Date;
    mode?: DynamicDatePickerMode;
}
export declare class DynamicDatePicker extends React.Component<IDynamicDatePickerProps, IDynamicDatePickerState> {
    constructor(props: IDynamicDatePickerProps);
    private readonly isInEditMode;
    private readonly isDeferredEditMode;
    private onRequestEditMode();
    private onAcceptEdit();
    private onCancelEdit();
    private handleChange(date);
    componentWillReceiveProps(props: IDynamicDatePickerProps): void;
    private renderClickableDate();
    private renderDatePicker();
    render(): JSX.Element;
}
