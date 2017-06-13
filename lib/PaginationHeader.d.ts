/// <reference types="react" />
import * as React from "react";
export interface IPaginationHeaderProps {
    pageCount: number;
    activePage: number;
    limit: number;
    onUpdateOffsetForPage(page: number): void;
    onUpdateLimitForPage(limit: number): void;
}
export interface IPaginationHeaderState {
    jumpPage?: number;
    limit?: number;
}
export declare class PaginationHeader extends React.Component<IPaginationHeaderProps, IPaginationHeaderState> {
    constructor(props: IPaginationHeaderProps);
    private onPageTextChanged(evt);
    private onKeyPress(evt);
    private readonly validationState;
    componentWillReceiveProps(nextProps: IPaginationHeaderProps): void;
    private renderGrid();
    private renderPageJump();
    private renderPagination();
    render(): JSX.Element;
}
