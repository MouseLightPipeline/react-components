"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Autosuggest = require("react-autosuggest");
var util_1 = require("util");
var DynamicAutoSuggestMode;
(function (DynamicAutoSuggestMode) {
    DynamicAutoSuggestMode[DynamicAutoSuggestMode["Static"] = 0] = "Static";
    DynamicAutoSuggestMode[DynamicAutoSuggestMode["Edit"] = 1] = "Edit";
})(DynamicAutoSuggestMode = exports.DynamicAutoSuggestMode || (exports.DynamicAutoSuggestMode = {}));
var DynamicAutoSuggest = (function (_super) {
    __extends(DynamicAutoSuggest, _super);
    function DynamicAutoSuggest(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            suggestions: [],
            initialPropValue: props.initialValue,
            value: props.initialValue,
            mode: DynamicAutoSuggestMode.Static
        };
        return _this;
    }
    Object.defineProperty(DynamicAutoSuggest.prototype, "isInEditMode", {
        get: function () {
            return (this.props.isEditOnly) || this.state.mode === DynamicAutoSuggestMode.Edit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicAutoSuggest.prototype, "isDeferredEditMode", {
        get: function () {
            return !util_1.isNullOrUndefined(this.props.isDeferredEditMode) && this.props.isDeferredEditMode;
        },
        enumerable: true,
        configurable: true
    });
    DynamicAutoSuggest.prototype.onRequestEditMode = function () {
        this.setState({ mode: DynamicAutoSuggestMode.Edit });
    };
    DynamicAutoSuggest.prototype.onAcceptEdit = function () {
        this.setState({ mode: DynamicAutoSuggestMode.Static });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    };
    DynamicAutoSuggest.prototype.onCancelEdit = function () {
        this.setState({ mode: DynamicAutoSuggestMode.Static, value: this.props.initialValue });
    };
    DynamicAutoSuggest.prototype.onAutoSuggestInputChange = function (obj) {
        this.setState({
            value: obj.newValue
        });
        if (this.isInEditMode && !this.isDeferredEditMode) {
            if (this.props.onChange) {
                this.props.onChange(obj.newValue);
            }
        }
    };
    ;
    DynamicAutoSuggest.prototype.getSuggestions = function (value) {
        var _this = this;
        if (!this.props.items) {
            return [];
        }
        var inputValue = value.trim().toLowerCase();
        var inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.items.filter(function (item) {
            return item[_this.props.displayProperty].toLowerCase().indexOf(inputValue) > -1;
        });
    };
    DynamicAutoSuggest.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            initialPropValue: props.initialValue,
            value: props.initialValue
        }, null);
    };
    DynamicAutoSuggest.prototype.renderClickableValue = function () {
        var _this = this;
        return (<a onClick={function () { return _this.onRequestEditMode(); }}>
                {this.renderValue(this.state.value)}
            </a>);
    };
    DynamicAutoSuggest.prototype.renderValue = function (value) {
        if (util_1.isNullOrUndefined(value) || value.length === 0) {
            return (<span style={{ color: "#AAA" }}>{this.props.placeHolder || "(none)"}</span>);
        }
        return value;
    };
    DynamicAutoSuggest.prototype.renderAutoSuggest = function (isInputGroup) {
        var _this = this;
        if (isInputGroup === void 0) { isInputGroup = false; }
        var inputProps = {
            placeholder: this.props.placeholder,
            value: this.state.value || "",
            onChange: function (event, obj) { return _this.onAutoSuggestInputChange(obj); }
        };
        var theme = isInputGroup ? inputGroupTheme : standardTheme;
        var props = {
            theme: theme,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: function (obj) { return _this.onSuggestionsFetchRequested(obj); },
            onSuggestionsClearRequested: function () { return _this.onSuggestionsClearRequested(); },
            getSuggestionValue: function (suggestion) { return _this.getSuggestionValue(suggestion); },
            renderSuggestion: function (suggestion) { return _this.renderSuggestion(suggestion); },
            inputProps: inputProps
        };
        return (<Autosuggest {...props}/>);
    };
    // Use your imagination to render suggestions.
    DynamicAutoSuggest.prototype.renderSuggestion = function (suggestion) {
        return (<div>
                {suggestion[this.props.displayProperty]}
            </div>);
    };
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    DynamicAutoSuggest.prototype.onSuggestionsFetchRequested = function (_a) {
        var value = _a.value;
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };
    ;
    // Autosuggest will call this function every time you need to clear suggestions.
    DynamicAutoSuggest.prototype.onSuggestionsClearRequested = function () {
        this.setState({
            suggestions: []
        });
    };
    DynamicAutoSuggest.prototype.getSuggestionValue = function (suggestion) {
        return suggestion ? suggestion[this.props.displayProperty] : "";
    };
    DynamicAutoSuggest.prototype.render = function () {
        var _this = this;
        var style = {
            margin: "0px",
            display: "inline"
        };
        if (this.isInEditMode) {
            if (!this.isDeferredEditMode) {
                return this.renderAutoSuggest();
            }
            else {
                return (<react_bootstrap_1.FormGroup bsSize="small" style={style}>
                        <react_bootstrap_1.InputGroup bsSize="sm">
                            <react_bootstrap_1.InputGroup.Button>
                                <react_bootstrap_1.Button onClick={function () { return _this.onCancelEdit(); }}>
                                    <react_bootstrap_1.Glyphicon glyph="remove"/>
                                </react_bootstrap_1.Button>
                            </react_bootstrap_1.InputGroup.Button>
                            {this.renderAutoSuggest(true)}
                            <react_bootstrap_1.InputGroup.Button>
                                <react_bootstrap_1.Button bsStyle="success" onClick={function () { return _this.onAcceptEdit(); }}>
                                    <react_bootstrap_1.Glyphicon glyph="ok"/>
                                </react_bootstrap_1.Button>
                            </react_bootstrap_1.InputGroup.Button>
                        </react_bootstrap_1.InputGroup>
                    </react_bootstrap_1.FormGroup>);
            }
        }
        else {
            return this.renderClickableValue();
        }
    };
    return DynamicAutoSuggest;
}(React.Component));
exports.DynamicAutoSuggest = DynamicAutoSuggest;
var standardTheme = {
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
var inputGroupTheme = Object.assign({}, standardTheme, { input: "react-autosuggest__input_inputgroup" });
