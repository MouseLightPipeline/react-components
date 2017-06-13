"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const ReactDatePickerMod = require("react-datepicker");
const moment = require("moment");
const util_1 = require("util");
const ReactDatePicker = ReactDatePickerMod.default;
var DynamicDatePickerMode;
(function (DynamicDatePickerMode) {
    DynamicDatePickerMode[DynamicDatePickerMode["Static"] = 0] = "Static";
    DynamicDatePickerMode[DynamicDatePickerMode["Edit"] = 1] = "Edit";
})(DynamicDatePickerMode = exports.DynamicDatePickerMode || (exports.DynamicDatePickerMode = {}));
class DynamicDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPropValue: props.initialValue,
            value: props.initialValue,
            mode: DynamicDatePickerMode.Static
        };
    }
    get isInEditMode() {
        return this.state.mode === DynamicDatePickerMode.Edit;
    }
    get isDeferredEditMode() {
        return !util_1.isNullOrUndefined(this.props.isDeferredEditMode) && this.props.isDeferredEditMode;
    }
    onRequestEditMode() {
        this.setState({ mode: DynamicDatePickerMode.Edit }, null);
    }
    onAcceptEdit() {
        this.setState({ mode: DynamicDatePickerMode.Static });
        if (this.props.onChangeDate) {
            this.props.onChangeDate(this.state.value);
        }
    }
    onCancelEdit() {
        this.setState({ mode: DynamicDatePickerMode.Static, value: this.props.initialValue }, null);
    }
    handleChange(date) {
        this.setState({
            value: date.toDate()
        });
        if (this.isInEditMode && !this.isDeferredEditMode) {
            this.onAcceptEdit();
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            initialPropValue: props.initialValue,
            value: props.initialValue
        }, null);
    }
    renderClickableDate() {
        return (React.createElement("a", { onClick: () => this.onRequestEditMode() }, `${moment(this.state.value).format("YYYY-MM-DD")}`));
    }
    renderDatePicker() {
        return (React.createElement(ReactDatePicker, { className: "date-picker-input", dateFormat: "YYYY-MM-DD", selected: moment(this.state.value), onChange: (d) => this.handleChange(d) }));
    }
    render() {
        const style = {
            margin: "0px",
            display: "inline"
        };
        if (this.isInEditMode) {
            if (!this.isDeferredEditMode) {
                return this.renderDatePicker();
            }
            else {
                return (React.createElement(react_bootstrap_1.FormGroup, { bsSize: "small", style: style },
                    React.createElement(react_bootstrap_1.InputGroup, { bsSize: "sm" },
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { onClick: () => this.onCancelEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "remove" }))),
                        this.renderDatePicker(),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { bsStyle: "success", onClick: () => this.onAcceptEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "ok" }))))));
            }
        }
        else {
            return this.renderClickableDate();
        }
    }
}
exports.DynamicDatePicker = DynamicDatePicker;
//# sourceMappingURL=DynamicDatePicker.js.map