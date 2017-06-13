"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.toastCreateSuccess = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Create successful")));
};
exports.toastCreateError = (error) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Create failed"),
        error ? error.message : "(no additional details available)"));
};
exports.toastUpdateSuccess = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Update successful")));
};
exports.toastUpdateError = (error) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Update failed"),
        error ? error.message : "(no additional details available)"));
};
exports.toastDeleteSuccess = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Delete successful")));
};
exports.toastDeleteError = (error) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Delete failed"),
        error ? error.message : "(no additional details available)"));
};
//# sourceMappingURL=Toasts.js.map