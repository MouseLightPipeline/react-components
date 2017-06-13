"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Autosuggest = require("react-autosuggest");
const util_1 = require("util");
var DynamicAutoSuggestMode;
(function (DynamicAutoSuggestMode) {
    DynamicAutoSuggestMode[DynamicAutoSuggestMode["Static"] = 0] = "Static";
    DynamicAutoSuggestMode[DynamicAutoSuggestMode["Edit"] = 1] = "Edit";
})(DynamicAutoSuggestMode = exports.DynamicAutoSuggestMode || (exports.DynamicAutoSuggestMode = {}));
class DynamicAutoSuggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            initialPropValue: props.initialValue,
            value: props.initialValue,
            mode: DynamicAutoSuggestMode.Static
        };
    }
    get isInEditMode() {
        return (this.props.isEditOnly) || this.state.mode === DynamicAutoSuggestMode.Edit;
    }
    get isDeferredEditMode() {
        return !util_1.isNullOrUndefined(this.props.isDeferredEditMode) && this.props.isDeferredEditMode;
    }
    onRequestEditMode() {
        this.setState({ mode: DynamicAutoSuggestMode.Edit });
    }
    onAcceptEdit() {
        this.setState({ mode: DynamicAutoSuggestMode.Static });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    onCancelEdit() {
        this.setState({ mode: DynamicAutoSuggestMode.Static, value: this.props.initialValue });
    }
    onAutoSuggestInputChange(obj) {
        this.setState({
            value: obj.newValue
        });
        if (this.isInEditMode && !this.isDeferredEditMode) {
            if (this.props.onChange) {
                this.props.onChange(obj.newValue);
            }
        }
    }
    ;
    getSuggestions(value) {
        if (!this.props.items) {
            return [];
        }
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.items.filter(item => {
            return item[this.props.displayProperty].toLowerCase().indexOf(inputValue) > -1;
        });
    }
    componentWillReceiveProps(props) {
        this.setState({
            initialPropValue: props.initialValue,
            value: props.initialValue
        }, null);
    }
    renderClickableValue() {
        return (React.createElement("a", { onClick: () => this.onRequestEditMode() }, this.renderValue(this.state.value)));
    }
    renderValue(value) {
        if (util_1.isNullOrUndefined(value) || value.length === 0) {
            return (React.createElement("span", { style: { color: "#AAA" } }, this.props.placeHolder || "(none)"));
        }
        return value;
    }
    renderAutoSuggest(isInputGroup = false) {
        const inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value || "",
            onChange: (event, obj) => this.onAutoSuggestInputChange(obj)
        };
        const theme = isInputGroup ? inputGroupTheme : standardTheme;
        const props = {
            theme: theme,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: (obj) => this.onSuggestionsFetchRequested(obj),
            onSuggestionsClearRequested: () => this.onSuggestionsClearRequested(),
            getSuggestionValue: (suggestion) => this.getSuggestionValue(suggestion),
            renderSuggestion: (suggestion) => this.renderSuggestion(suggestion),
            inputProps: inputProps
        };
        return (React.createElement(Autosuggest, Object.assign({}, props)));
    }
    // Use your imagination to render suggestions.
    renderSuggestion(suggestion) {
        return (React.createElement("div", null, suggestion[this.props.displayProperty]));
    }
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested({ value }) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    ;
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }
    getSuggestionValue(suggestion) {
        return suggestion ? suggestion[this.props.displayProperty] : "";
    }
    render() {
        const style = {
            margin: "0px",
            display: "inline"
        };
        if (this.isInEditMode) {
            if (!this.isDeferredEditMode) {
                return this.renderAutoSuggest();
            }
            else {
                return (React.createElement(react_bootstrap_1.FormGroup, { bsSize: "small", style: style },
                    React.createElement(react_bootstrap_1.InputGroup, { bsSize: "sm" },
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { onClick: () => this.onCancelEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "remove" }))),
                        this.renderAutoSuggest(true),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { bsStyle: "success", onClick: () => this.onAcceptEdit() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "ok" }))))));
            }
        }
        else {
            return this.renderClickableValue();
        }
    }
}
exports.DynamicAutoSuggest = DynamicAutoSuggest;
const standardTheme = {
    container: "react-autosuggest__container",
    containerOpen: "react-autosuggest__container--open",
    input: "react-autosuggest__input",
    inputOpen: "react-autosuggest__input--open",
    inputFocused: "react-autosuggest__input--focused",
    suggestionsContainer: "react-autosuggest__suggestions-container",
    suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
    suggestionsList: "react-autosuggest__suggestions-list",
    suggestion: "react-autosuggest__suggestion",
    suggestionFirst: "react-autosuggest__suggestion--first",
    suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
    sectionContainer: "react-autosuggest__section-container",
    sectionContainerFirst: "react-autosuggest__section-container--first",
    sectionTitle: "react-autosuggest__section-title"
};
const inputGroupTheme = Object.assign({}, standardTheme, { input: "react-autosuggest__input_inputgroup" });
//# sourceMappingURL=DynamicAutoSuggest.js.map