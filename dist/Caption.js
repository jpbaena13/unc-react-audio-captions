"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Caption =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Caption, _React$PureComponent);

  function Caption(props) {
    var _this;

    _classCallCheck(this, Caption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Caption).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onListener", function (currentTime) {
      if (_this.props.start <= currentTime && _this.state.classname === 'animated') {
        _this.setState({
          classname: (0, _classnames.default)('animated', _this.props.animation),
          noDisplay: false
        });
      } else if (_this.props.start > currentTime && _this.state.classname !== 'animated') {
        _this.setState({
          classname: 'animated',
          noDisplay: false
        });
      }

      if (_this.props.end && _this.props.end <= currentTime || _this.props.start > currentTime && _this.props.noDisplay) {
        _this.setState({
          noDisplay: true
        });
      } else if (_this.state.noDisplay) {
        _this.setState({
          noDisplay: false
        });
      }
    });

    _this.state = {
      classname: 'animated',
      noDisplay: false
    };

    _this.props.listeners.push(_this.onListener);

    return _this;
  }
  /**
   * This functions is added to parent's listeners array.
   * Update the state of the component according its props.
   *
   * @param  {int} currentTime Audio current time from parent.
   */


  _createClass(Caption, [{
    key: "render",

    /**
     * Render method.
     */
    value: function render() {
      return _react.default.createElement(this.props.tagName, {
        className: this.state.classname,
        children: this.props.children,
        style: {
          display: this.state.noDisplay && 'none'
        }
      });
    }
  }]);

  return Caption;
}(_react.default.PureComponent);

Caption.defaultProps = {
  animation: 'bounceInRight',
  tagName: 'div'
};
var _default = Caption;
exports.default = _default;