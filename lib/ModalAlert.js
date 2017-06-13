"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class ModalAlert extends React.Component {
    renderHeader() {
        if (this.props.header) {
            if (this.props.header instanceof String || typeof this.props.header === "string") {
                return (React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                    React.createElement(react_bootstrap_1.Modal.Title, { id: "create-registration-dialog" }, this.props.header)));
            }
            else {
                return this.props.header;
            }
        }
        else {
            return null;
        }
    }
    renderAcknowledge(alertStyle) {
        if (this.props.acknowledgeContent) {
            if (this.props.acknowledgeContent instanceof String || typeof this.props.acknowledgeContent === "string") {
                return (React.createElement(react_bootstrap_1.Button, { bsStyle: alertStyle, onClick: this.props.onAcknowledge }, this.props.acknowledgeContent));
            }
            else {
                return this.props.acknowledgeContent;
            }
        }
        else {
            return (React.createElement(react_bootstrap_1.Button, { bsStyle: alertStyle, onClick: this.props.onAcknowledge }, "Ok"));
        }
    }
    render() {
        const alertStyle = this.props.style || "default";
        return (React.createElement(react_bootstrap_1.Modal, { show: this.props.show, onHide: this.props.onCancel, "aria-labelledby": "create-registration-dialog" },
            this.renderHeader(),
            React.createElement(react_bootstrap_1.Modal.Body, null, this.props.message),
            React.createElement(react_bootstrap_1.Modal.Footer, null,
                this.props.canCancel ? React.createElement(react_bootstrap_1.Button, { onClick: this.props.onCancel }, "Cancel") : null,
                this.renderAcknowledge(alertStyle))));
    }
}
exports.ModalAlert = ModalAlert;
//# sourceMappingURL=ModalAlert.js.map