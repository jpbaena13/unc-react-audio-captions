"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Caption = _interopRequireDefault(require("./Caption"));

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

var AudioCaptions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AudioCaptions, _React$Component);

  function AudioCaptions(props) {
    var _this;

    _classCallCheck(this, AudioCaptions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioCaptions).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "playAudio", function (currentTime) {
      if (currentTime !== undefined) _this.audio.currentTime = currentTime;

      _this.audio.play();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pauseAudio", function () {
      _this.audio.pause();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTimeUpdate", function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          audio = _assertThisInitialize.audio;

      var currentTime = parseInt(audio.currentTime, 10);

      _this.listeners.forEach(function (callback) {
        callback(currentTime);
      });

      if (_this.props.onTimeUpdate) _this.props.onTimeUpdate(currentTime);

      if (!_this.state.isVisible && _this.props.start < parseInt(audio.currentTime, 10)) {
        _this.setState({
          isVisible: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderCaptions", function (child, idx) {
      if (!child.props || !child.props.children) return child;
      var children = child.props.children;

      if (children.map) {
        children = children.map(function (item, ix) {
          return _this.renderCaptions(item, "".concat(idx, "_").concat(ix));
        });
      } else {
        children = _this.renderCaptions(children, "".concat(idx, "_0"));
      }

      return _react.default.cloneElement(child, {
        key: idx,
        children: children,
        listeners: child.type === _Caption.default ? _this.listeners : undefined
      });
    });

    _this.state = {
      isVisible: !props.start || props.start <= 0
    };
    _this.listeners = [];
    return _this;
  }
  /**
   * Lifecycle
   */


  _createClass(AudioCaptions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.audio.ontimeupdate = this.onTimeUpdate;
    }
    /**
     * Plays the audio
     *
     * @param {int} currentTime Indicates the position for the playback in seconds.
     */

  }, {
    key: "render",

    /**
     * Render method
     */
    value: function render() {
      var _this2 = this;

      var className = (0, _classnames.default)('unc-captions', this.props.className, _defineProperty({
        animated: this.props.start
      }, "".concat(this.props.animation), this.props.start && this.state.isVisible));
      return _react.default.createElement("div", {
        className: className
      }, this.props.children.map && this.props.children.map(function (child, idx) {
        return _this2.renderCaptions(child, "".concat(idx));
      }) || this.renderCaptions(this.props.children, '0'), _react.default.createElement("audio", {
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

AudioCaptions.defaultProps = {
  animation: 'bounceInRight'
};
var _default = AudioCaptions;
exports.default = _default;