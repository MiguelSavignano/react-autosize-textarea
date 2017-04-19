'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autosize = require('autosize');

var _autosize2 = _interopRequireDefault(_autosize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPDATE = 'autosize:update',
    DESTROY = 'autosize:destroy',
    RESIZED = 'autosize:resized';

/** A light replacement for built-in textarea component
 * which automaticaly adjusts its height to match the content
 * @param onResize - called whenever the textarea resizes
 * @param rows - minimum number of visible rows
 * @param maxRows - maximum number of visible rows
 */
var TextareaAutosize = (_temp2 = _class = function (_React$Component) {
  _inherits(TextareaAutosize, _React$Component);

  function TextareaAutosize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextareaAutosize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextareaAutosize.__proto__ || Object.getPrototypeOf(TextareaAutosize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      maxHeight: null
    }, _this.dispatchEvent = function (EVENT_TYPE) {
      var event = document.createEvent('Event');
      event.initEvent(EVENT_TYPE, true, false);

      _this.textarea.dispatchEvent(event);
    }, _this.getValue = function (_ref2) {
      var valueLink = _ref2.valueLink,
          value = _ref2.value;
      return valueLink ? valueLink.value : value;
    }, _this.hasReachedMaxRows = function (value) {
      var maxRows = _this.props.maxRows;


      var numberOfRows = (value || '').split('\n').length;

      return numberOfRows >= parseInt(maxRows);
    }, _this.updateMaxHeight = function (value) {
      var _this2 = _this,
          maxRows = _this2.props.maxRows,
          maxHeight = _this2.state.maxHeight;


      var hasReachedMaxRows = _this.hasReachedMaxRows(value);

      if (!maxHeight && hasReachedMaxRows) {
        var numberOfRows = (value || '').split('\n').length;
        var computedStyle = window.getComputedStyle(_this.textarea);

        var paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
        var paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-top'), 10);
        var verticalPadding = (paddingTop || 0) + (paddingBottom || 0);

        var borderTopWidth = parseInt(computedStyle.getPropertyValue('border-top-width'), 10);
        var borderBottomWidth = parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
        var verticalBorderWidth = (borderTopWidth || 0) + (borderBottomWidth || 0);

        var height = _this.textarea.offsetHeight - verticalPadding - verticalBorderWidth;

        _this.setState({
          maxHeight: height / numberOfRows * maxRows
        });

        return true;
      } else if (maxHeight && !hasReachedMaxRows) {
        _this.setState({ maxHeight: null });

        return false;
      }
    }, _this.onChange = function (e) {
      _this.updateMaxHeight(e.target.value);
      _this.props.onChange && _this.props.onChange(e);
    }, _this.getLocals = function () {
      var _this3 = _this,
          _this3$props = _this3.props,
          onResize = _this3$props.onResize,
          maxRows = _this3$props.maxRows,
          onChange = _this3$props.onChange,
          style = _this3$props.style,
          props = _objectWithoutProperties(_this3$props, ['onResize', 'maxRows', 'onChange', 'style']),
          maxHeight = _this3.state.maxHeight;

      return _extends({}, props, {
        style: maxHeight ? _extends({}, style, { maxHeight: maxHeight }) : style,
        onChange: _this.onChange
      });
    }, _this.onInnerRef = function (ref) {
      if (_this.props.innerRef) {
        _this.props.innerRef(ref);
      }
      _this.textarea = ref;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TextareaAutosize, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      var _props = this.props,
          value = _props.value,
          defaultValue = _props.defaultValue,
          onResize = _props.onResize;


      (0, _autosize2.default)(this.textarea);

      if (this.hasReachedMaxRows(value || defaultValue)) {
        this.updateMaxHeight(value || defaultValue);

        // this trick is needed to force "autosize" to activate the scrollbar
        this.dispatchEvent(DESTROY);
        setTimeout(function () {
          return (0, _autosize2.default)(_this4.textarea);
        });
      }

      if (onResize) {
        this.textarea.addEventListener(RESIZED, this.props.onResize);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.onResize) {
        this.textarea.removeEventListener(RESIZED, this.props.onResize);
      }
      this.dispatchEvent(DESTROY);
    }
  }, {
    key: 'render',
    value: function render() {
      var _getLocals = this.getLocals(),
          children = _getLocals.children,
          locals = _objectWithoutProperties(_getLocals, ['children']);

      return _react2.default.createElement(
        'textarea',
        _extends({}, locals, { ref: this.onInnerRef }),
        children
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.getValue(prevProps) !== this.getValue(this.props)) {
        this.dispatchEvent(UPDATE);
      }
    }
  }]);

  return TextareaAutosize;
}(_react2.default.Component), _class.defaultProps = {
  rows: 1
}, _temp2);
exports.default = TextareaAutosize;


TextareaAutosize.propTypes = {
  rows: _propTypes2.default.number,
  maxRows: _propTypes2.default.number,
  onResize: _propTypes2.default.func
};