/// <reference types="react" />
/// <reference types="react-select" />
import * as React from "react";
import * as ReactSelectClass from "react-select";
import { Option } from "react-select";
import { CSSProperties } from "react";
export interface IDynamicSelectOption {
    id?: string | number;
}
export interface IDynamicSelectProps<T, S, U> {
    idName: string;
    isExclusiveEditMode?: boolean;
    isDeferredEditMode?: boolean;
    hasLeftInputGroup?: boolean;
    hasRightInputGroup?: boolean;
    options: T[];
    selectedOption: S;
    disabled?: boolean;
    placeholder?: string;
    multiSelect?: boolean;
    clearable?: boolean;
    useVirtualized?: boolean;
    style?: CSSProperties;
    userData?: U;
    filterOptions?(options: Option[], filterValue: string, currentValues: Option[]): Option[];
    filterOption?(option: string, filter: string): boolean;
    onSelect(option: S): void;
    onRequestAdd?(): void;
}
export interface IDynamicSelectState<T> {
    isInEditMode?: boolean;
    selectedOption?: T;
    isOpen?: boolean;
}
export declare class DynamicSelect<T, S, P, U> extends React.Component<IDynamicSelectProps<T, S, U>, IDynamicSelectState<S>> {
    constructor(props: IDynamicSelectProps<T, S, U>);
    protected findSelectedObject(option: P): S;
    private onSelectChange(option);
    private onAcceptEdit();
    private onCancelEdit();
    private onRequestEditMode();
    private readonly isExclusiveEditMode;
    isInEditMode: boolean;
    private readonly isDeferredEditMode;
    componentWillReceiveProps(props: IDynamicSelectProps<T, S, U>): void;
    protected selectValueForOption(option: T): any;
    protected selectLabelForOption(option: T): any;
    protected staticDisplayForOption(option: S): any;
    protected isSelectedOption(object: T, selectedOption: S): boolean;
    protected addToSelection(option: any, selection: any): any;
    protected filterOptions?(options: Option[], filterValue: string, currentValues: Option[]): Option[];
    protected filterOption?(option: string, filter: string): boolean;
    protected onInputKeyDown(event: any): void;
    protected renderSelect(selected: Option, options: Option[], hasLeftInputGroup: boolean, hasRightInputGroup: boolean): JSX.Element;
    private renderAddButton();
    render(): JSX.Element;
}
export declare class DynamicSingleSelect<T extends IDynamicSelectOption, U> extends DynamicSelect<T, T, Option, U> {
    protected findSelectedObject(option: Option): T;
    protected selectValueForOption(option: T): string | number;
    protected staticDisplayForOption(option: T): any;
    protected isSelectedOption(object: T, selectedOption: T): boolean;
    protected addToSelection(option: Option, selection: Option): ReactSelectClass.Option;
}
export declare class DynamicSimpleSelect<T extends IDynamicSelectOption> extends DynamicSingleSelect<T, any> {
}
export declare class DynamicMultiSelect<T extends IDynamicSelectOption, U> extends DynamicSelect<T, T[], Option[], U> {
    protected findSelectedObject(option: Option[]): T[];
    protected selectValueForOption(option: T): string | number;
    protected staticDisplayForOption(option: T[]): any;
    protected isSelectedOption(object: T, selectedOption: T[]): boolean;
    protected addToSelection(option: Option, selection: Option[]): ReactSelectClass.Option[];
}
export declare class DynamicSimpleMultiSelect<T extends IDynamicSelectOption> extends DynamicMultiSelect<T, any> {
}
