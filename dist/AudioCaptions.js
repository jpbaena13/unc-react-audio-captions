"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var AudioCaptions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AudioCaptions, _React$Component);

  function AudioCaptions(props) {
    var _this;

    _classCallCheck(this, AudioCaptions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioCaptions).call(this, props));
    _this.onTimeUpdate = _this.onTimeUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      captionsStarted: [],
      captionsEnded: []
    };
    return _this;
  }
  /**
   * Lifecycle
   */


  _createClass(AudioCaptions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.audio.ontimeupdate = this.onTimeUpdate;
      this.audio.play();
    }
    /**
     * Checks the start and end time for each caption and updates the state to the app
     * with the captions to show.
     */

  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate() {
      var audio = this.audio;

      var captionsStarted = _toConsumableArray(this.state.captionsStarted);

      var captionsEnded = _toConsumableArray(this.state.captionsEnded);

      var update = false;
      this.props.children.forEach(function (caption, idx) {
        var idxStarted = captionsStarted.indexOf(idx);
        var idxEnded = captionsEnded.indexOf(idx);

        if (caption.props.start <= parseInt(audio.currentTime, 10)) {
          if (idxStarted === -1) {
            update = captionsStarted.push(idx);
          }

          if (!caption.props.end || caption.props.end >= parseInt(audio.currentTime, 10)) {
            if (idxEnded !== -1) {
              update = captionsEnded.splice(idxEnded, 1);
            }
          } else if (idxEnded === -1) {
            update = captionsEnded.push(idx);
          }
        } else {
          if (idxStarted !== -1) {
            update = captionsStarted.splice(idxStarted, 1);
          }

          if (idxEnded !== -1) {
            update = captionsEnded.splice(idxEnded, 1);
          }
        }
      });

      if (update) {
        this.setState({
          captionsStarted: captionsStarted,
          captionsEnded: captionsEnded
        });
      }
    }
    /**
     * Render method
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "unc-captions"
      }, this.props.children.map(function (caption, idx) {
        var className = 'animated';

        if (_this2.state.captionsStarted.indexOf(idx) !== -1) {
          className += " ".concat(caption.props.animation);

          if (_this2.state.captionsEnded.indexOf(idx) !== -1) {
            return null;
          }
        } else if (caption.props.noDisplay) {
          return null;
        }

        return _react.default.cloneElement(caption, {
          key: idx,
          className: className
        });
      }), _react.default.createElement("audio", {
        src: this.props.src,
        controls: this.props.controls,
        autoPlay: this.props.autoPlay,
        ref: function ref(_ref) {
          _this2.audio = _ref;
        }
      }));
    }
  }]);

  return AudioCaptions;
}(_react.default.Component);

var _default = AudioCaptions;
exports.default = _default;