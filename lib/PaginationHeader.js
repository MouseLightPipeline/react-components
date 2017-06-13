"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Slider = require("rc-slider").default;
class PaginationHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jumpPage: 1,
            limit: 10
        };
    }
    onPageTextChanged(evt) {
        this.setState({ jumpPage: evt.target.value });
    }
    onKeyPress(evt) {
        if (evt.charCode === 13) {
            const page = parseInt(evt.target.value);
            if (!isNaN(page) && page > 0 && page <= this.props.pageCount) {
                this.props.onUpdateOffsetForPage(page);
            }
        }
    }
    get validationState() {
        return (this.state.jumpPage > 0 && this.state.jumpPage <= this.props.pageCount) ? null : "warning";
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.activePage != this.props.activePage) {
            this.setState({ jumpPage: nextProps.activePage });
        }
        this.setState({ limit: nextProps.limit });
    }
    renderGrid() {
        const paddingTop = this.props.pageCount > 1 ? "0px" : "24px";
        return (React.createElement("div", { style: {
                padding: "0px",
                backgroundColor: "#fff",
                height: "71px",
                display: "inline-block"
            } },
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: {
                                width: "400px",
                                paddingRight: "60px",
                                paddingLeft: "20px",
                                paddingTop: paddingTop,
                                paddingBottom: "10px"
                            } },
                            React.createElement(Slider, { min: 10, max: 50, step: 5, value: this.state.limit, marks: { 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" }, onChange: (value) => this.setState({ limit: value }, null), onAfterChange: (value) => this.props.onUpdateLimitForPage(value) })),
                        this.renderPagination(),
                        this.renderPageJump())))));
    }
    renderPageJump() {
        if (this.props.pageCount > 1) {
            return (React.createElement("td", null,
                React.createElement(react_bootstrap_1.FormGroup, { bsSize: "sm", validationState: this.validationState, style: {
                        display: "inline-block",
                        paddingTop: "20px",
                        marginLeft: "20px",
                        width: "80px"
                    } },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", value: this.state.jumpPage, onKeyPress: (evt) => this.onKeyPress(evt), onChange: (evt) => this.onPageTextChanged(evt) }))));
        }
        else {
            return null;
        }
    }
    renderPagination() {
        if (this.props.pageCount > 1) {
            return (React.createElement("td", { style: { paddingTop: "5px" } },
                React.createElement(react_bootstrap_1.Pagination, { prev: true, next: true, ellipsis: true, boundaryLinks: true, bsSize: "medium", style: { display: "inline" }, first: this.props.pageCount > 2, last: this.props.pageCount > 2, maxButtons: 10, items: this.props.pageCount, activePage: this.props.activePage, onSelect: (page) => {
                        this.props.onUpdateOffsetForPage(page);
                    } })));
        }
        else {
            return null;
        }
    }
    render() {
        return this.renderGrid();
    }
}
exports.PaginationHeader = PaginationHeader;
//# sourceMappingURL=PaginationHeader.js.map