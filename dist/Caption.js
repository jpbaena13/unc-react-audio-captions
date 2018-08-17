"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var Caption = function Caption(props) {
  return _react.default.createElement("div", {
    className: props.className
  }, props.children);
};

Caption.defaultProps = {
  animation: 'bounceInRight'
};
var _default = Caption;
exports.default = _default;