/// <reference types="react" />
import * as React from "react";
export declare enum DynamicAutoSuggestMode {
    Static = 0,
    Edit = 1,
}
export interface IObjectAutoSuggestProps<T> {
    items: T[];
    placeholder: string;
    displayProperty: string;
    initialValue: string;
    isDeferredEditMode?: boolean;
    isEditOnly?: boolean;
    placeHolder?: string;
    onChange?(value: string): void;
}
export interface IObjectAutoSuggestState<T> {
    suggestions: T[];
    initialPropValue?: any;
    value?: string;
    mode?: DynamicAutoSuggestMode;
}
export declare class DynamicAutoSuggest<T extends any> extends React.Component<IObjectAutoSuggestProps<T>, IObjectAutoSuggestState<T>> {
    constructor(props: any);
    private readonly isInEditMode;
    private readonly isDeferredEditMode;
    private onRequestEditMode();
    private onAcceptEdit();
    private onCancelEdit();
    private onAutoSuggestInputChange(obj);
    private getSuggestions(value);
    componentWillReceiveProps(props: IObjectAutoSuggestProps<T>): void;
    private renderClickableValue();
    protected renderValue(value: string): string | JSX.Element;
    private renderAutoSuggest(isInputGroup?);
    private renderSuggestion(suggestion);
    private onSuggestionsFetchRequested({value});
    private onSuggestionsClearRequested();
    private getSuggestionValue(suggestion);
    render(): JSX.Element;
}
