"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactSelectClass = require("react-select");
const react_bootstrap_1 = require("react-bootstrap");
const util_1 = require("util");
const react_virtualized_select_1 = require("react-virtualized-select");
// T Defines individual options (e.g., ISample)
// S Defines selected options (e.g., ISample for single select, ISample[] for multi-select)
// P Defines expected deliverable on select (Option for single select, Option[] for multi-select)
// U Defines type of optional user-defined prop data
class DynamicSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isInEditMode: false, selectedOption: props.selectedOption, isOpen: false };
    }
    findSelectedObject(option) {
        return null;
    }
    onSelectChange(option) {
        const selectedObject = this.findSelectedObject(option);
        if (this.isExclusiveEditMode || !this.isDeferredEditMode) {
            if (this.props.onSelect) {
                this.props.onSelect(selectedObject);
            }
        }
        else {
            this.setState({ selectedOption: selectedObject });
        }
    }
    onAcceptEdit() {
        this.setState({ isInEditMode: false });
        if (this.props.onSelect) {
            this.props.onSelect(this.state.selectedOption);
        }
    }
    onCancelEdit() {
        this.setState({ isInEditMode: false, selectedOption: this.props.selectedOption });
    }
    onRequestEditMode() {
        this.setState({ isInEditMode: true });
    }
    get isExclusiveEditMode() {
        return (util_1.isNullOrUndefined(this.props.isExclusiveEditMode) || this.props.isExclusiveEditMode);
    }
    get isInEditMode() {
        return this.isExclusiveEditMode || this.state.isInEditMode;
    }
    set isInEditMode(b) {
        this.setState({ isInEditMode: b });
    }
    get isDeferredEditMode() {
        return !util_1.isNullOrUndefined(this.props.isDeferredEditMode) && this.props.isDeferredEditMode;
    }
    componentWillReceiveProps(props) {
        // if (this.isExclusiveEditMode || !this.isInEditMode) {
        this.setState({ selectedOption: props.selectedOption });
        // }
    }
    selectValueForOption(option) {
        return option;
    }
    selectLabelForOption(option) {
        return option.toString();
    }
    staticDisplayForOption(option) {
        return option.toString();
    }
    isSelectedOption(object, selectedOption) {
        return false;
    }
    addToSelection(option, selection) {
    }
    filterOptions(options, filterValue, currentValues) {
        if (this.props.filterOptions) {
            return this.props.filterOptions(options, filterValue, currentValues);
        }
        return options;
    }
    filterOption(option, filter) {
        if (this.props.filterOption) {
            return this.props.filterOption(option, filter);
        }
        return true;
    }
    onInputKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                if (!this.state.isOpen && this.state.isInEditMode && this.props.isDeferredEditMode) {
                    this.onAcceptEdit();
                    event.preventDefault();
                }
                break;
        }
    }
    renderSelect(selected, options, isInputGroup = false) {
        const style = isInputGroup ? { borderRadius: 0 } : {};
        const props = {
            name: `${this.props.idName}-select`,
            placeholder: this.props.placeholder || "Select...",
            value: selected,
            options: options,
            clearable: this.props.clearable,
            disabled: this.props.disabled,
            multi: this.props.multiSelect,
            style: style,
            filterOption: (option, filter) => this.filterOption(option, filter),
            filterOptions: (options, filterValue, currentValues) => this.filterOptions(options, filterValue, currentValues),
            onChange: (option) => this.onSelectChange(option),
            onInputKeyDown: (event) => this.onInputKeyDown(event),
            onOpen: () => this.setState({ isOpen: true }),
            onClose: () => this.setState({ isOpen: false })
        };
        return this.props.useVirtualized ? (React.createElement(react_virtualized_select_1.default, Object.assign({}, props))) : (React.createElement(ReactSelectClass, Object.assign({}, props)));
    }
    renderAddButton() {
        if (!this.props.onRequestAdd) {
            return null;
        }
        return (React.createElement(react_bootstrap_1.InputGroup.Button, null,
            React.createElement(react_bootstrap_1.Button, { bsStyle: "info", onClick: () => this.props.onRequestAdd(), style: { borderRadius: 0 } },
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "plus" }))));
    }
    render() {
        const style = {
            margin: "0px",
            display: "inline"
        };
        let selection = null;
        const options = this.props.options.map(o => {
            const option = { label: this.selectLabelForOption(o), value: this.selectValueForOption(o) };
            if (this.state.selectedOption && this.isSelectedOption(o, this.state.selectedOption)) {
                selection = this.addToSelection(option, selection);
            }
            return option;
        });
        if (this.isInEditMode) {
            if (!this.isDeferredEditMode) {
                return this.renderSelect(selection, options);
            }
            else {
                return (React.createElement(react_bootstrap_1.FormGroup, { style: style },
                    React.createElement(react_bootstrap_1.InputGroup, { bsSize: "sm" },
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { onClick: () => this.onCancelEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "remove" }))),
                        this.renderSelect(selection, options, true),
                        this.renderAddButton(),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { bsStyle: "success", onClick: () => this.onAcceptEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "ok" }))))));
            }
        }
        else {
            return (React.createElement("a", { onClick: () => this.onRequestEditMode() }, this.staticDisplayForOption(this.props.selectedOption)));
        }
    }
}
exports.DynamicSelect = DynamicSelect;
class DynamicSingleSelect extends DynamicSelect {
    findSelectedObject(option) {
        return option ? this.props.options.filter(s => s.id === option.value)[0] : null;
    }
    selectValueForOption(option) {
        return option.id;
    }
    staticDisplayForOption(option) {
        if (util_1.isNullOrUndefined(option) && util_1.isNullOrUndefined(this.props.userData)) {
            return (React.createElement("span", { style: { color: "#AAA" } }, this.props.placeholder));
        }
        return this.selectLabelForOption(option);
    }
    isSelectedOption(object, selectedOption) {
        return object.id === selectedOption.id;
    }
    addToSelection(option, selection) {
        return option;
    }
}
exports.DynamicSingleSelect = DynamicSingleSelect;
class DynamicSimpleSelect extends DynamicSingleSelect {
}
exports.DynamicSimpleSelect = DynamicSimpleSelect;
class DynamicMultiSelect extends DynamicSelect {
    findSelectedObject(option) {
        return option.map(o => {
            return this.props.options.find(s => s.id === o.value);
        });
    }
    selectValueForOption(option) {
        return option.id;
    }
    staticDisplayForOption(option) {
        return this.selectLabelForOption(option[0]);
    }
    isSelectedOption(object, selectedOption) {
        return (selectedOption.length > 0) && !util_1.isNullOrUndefined(selectedOption.find(s => s.id === object.id));
    }
    addToSelection(option, selection) {
        if (selection) {
            selection.push(option.value);
        }
        else {
            selection = [option.value];
        }
        return selection;
    }
}
exports.DynamicMultiSelect = DynamicMultiSelect;
class DynamicSimpleMultiSelect extends DynamicMultiSelect {
}
exports.DynamicSimpleMultiSelect = DynamicSimpleMultiSelect;
//# sourceMappingURL=DynamicSelect.js.map