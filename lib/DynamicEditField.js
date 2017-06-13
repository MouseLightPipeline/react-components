"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const util_1 = require("util");
var DynamicEditFieldMode;
(function (DynamicEditFieldMode) {
    DynamicEditFieldMode[DynamicEditFieldMode["Static"] = 0] = "Static";
    DynamicEditFieldMode[DynamicEditFieldMode["Edit"] = 1] = "Edit";
})(DynamicEditFieldMode = exports.DynamicEditFieldMode || (exports.DynamicEditFieldMode = {}));
class DynamicEditField extends React.Component {
    constructor(props) {
        super(props);
        this.onEdit = () => {
            if (!this.props.canEditFunction || this.props.canEditFunction()) {
                this.setState({ mode: DynamicEditFieldMode.Edit }, null);
                if (this.props.onEditModeChanged) {
                    this.props.onEditModeChanged(DynamicEditFieldMode.Edit);
                }
            }
            else {
                this.setState({ showEditFail: true }, null);
            }
        };
        this.onCancelEdit = () => {
            this.setState({ value: this.props.initialValue, mode: DynamicEditFieldMode.Static }, null);
            if (this.props.onEditModeChanged) {
                this.props.onEditModeChanged(DynamicEditFieldMode.Static);
            }
        };
        this.onValueChanged = (event) => {
            let value = event.target.value;
            let feedback = this.state.feedback;
            if (this.props.feedbackFunction) {
                feedback = this.props.feedbackFunction(value);
            }
            if (this.props.filterFunction) {
                value = this.props.filterFunction(value);
            }
            if (value !== null) {
                this.setState({ value, feedback }, null);
            }
            else {
                this.setState({ feedback }, null);
            }
        };
        this.format = (value) => {
            if (this.props.formatFunction) {
                return this.props.formatFunction(value, this.state.mode);
            }
            return value;
        };
        this.overlayControl = null;
        this.state = {
            initialPropValue: props.initialValue,
            value: props.initialValue,
            mode: DynamicEditFieldMode.Static,
            showEditFail: false,
            feedback: null
        };
    }
    onCanAcceptEdit() {
        if (this.props.canAcceptFunction) {
            return this.props.canAcceptFunction(this.state.value);
        }
        return true;
    }
    onAcceptEdit() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = !this.props.acceptFunction || (yield this.props.acceptFunction(this.state.value));
            if (result) {
                this.setState({ mode: DynamicEditFieldMode.Static }, null);
                if (this.props.onEditModeChanged) {
                    this.props.onEditModeChanged(DynamicEditFieldMode.Static);
                }
            }
        });
    }
    ;
    componentWillReceiveProps(props) {
        this.setState({
            initialPropValue: props.initialValue,
            value: props.initialValue
        }, null);
    }
    get staticValueDisplay() {
        if (util_1.isNullOrUndefined(this.state.value) || this.state.value.length === 0) {
            return (React.createElement("span", { style: { color: "#AAA" } }, this.props.placeHolder));
        }
        return this.state.value;
    }
    render() {
        const style = {
            margin: "0px",
            display: "inline"
        };
        const staticDivStyle = this.props.style || { display: "inline-block" };
        const overlapProps = {
            placement: "top",
            rootClose: true,
            target: this.overlayControl,
            show: this.state.showEditFail,
            onHide: () => this.setState({ showEditFail: false }, null),
            onEntered: () => setTimeout(() => this.setState({ showEditFail: false }, null), 4000)
        };
        if (this.state.mode === DynamicEditFieldMode.Edit) {
            return (React.createElement(react_bootstrap_1.FormGroup, { style: style },
                React.createElement(react_bootstrap_1.InputGroup, { bsSize: "sm" },
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(react_bootstrap_1.Button, { onClick: this.onCancelEdit, style: { display: "inline" } },
                            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "remove" }))),
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", style: this.state.feedback ? { color: "red" } : {}, value: this.format(this.state.value), placeholder: this.props.placeHolder, onChange: this.onValueChanged }),
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "success", disabled: !this.onCanAcceptEdit(), onClick: () => this.onAcceptEdit() },
                            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "ok" })))),
                this.state.feedback ? React.createElement(react_bootstrap_1.HelpBlock, null, this.state.feedback) : null));
        }
        else {
            return (React.createElement("div", { ref: node => this.overlayControl = node, style: staticDivStyle, onClick: () => this.onEdit() },
                React.createElement(react_bootstrap_1.Overlay, Object.assign({}, overlapProps),
                    React.createElement(react_bootstrap_1.Tooltip, { id: "overload-left" }, this.props.canEditFailMessage)),
                React.createElement("a", null, this.staticValueDisplay)));
        }
    }
}
exports.DynamicEditField = DynamicEditField;
//# sourceMappingURL=DynamicEditField.js.map