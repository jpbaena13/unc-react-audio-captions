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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AudioCaptions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AudioCaptions, _React$Component);

  function AudioCaptions(props) {
    var _this;

    _classCallCheck(this, AudioCaptions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioCaptions).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "playAudio", function () {
      _this.audio.play();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pauseAudio", function () {
      _this.audio.pause();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTimeUpdate", function () {
      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          audio = _assertThisInitialize.audio;

      var captionsStarted = _toConsumableArray(_this.state.captionsStarted);

      var captionsEnded = _toConsumableArray(_this.state.captionsEnded);

      var isVisible = _this.state.isVisible;
      var update = false;

      _this.captions.forEach(function (caption) {
        var idxStarted = captionsStarted.indexOf(caption.key);
        var idxEnded = captionsEnded.indexOf(caption.key);

        if (caption.props.start <= parseInt(audio.currentTime, 10)) {
          if (idxStarted === -1) {
            update = captionsStarted.push(caption.key);
          }

          if (!caption.props.end || caption.props.end >= parseInt(audio.currentTime, 10)) {
            if (idxEnded !== -1) {
              update = captionsEnded.splice(idxEnded, 1);
            }
          } else if (idxEnded === -1) {
            update = captionsEnded.push(caption.key);
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

      if (!isVisible && _this.props.start < parseInt(audio.currentTime, 10)) {
        isVisible = true;
        update = true;
      }

      if (update) {
        _this.setState({
          captionsStarted: captionsStarted,
          captionsEnded: captionsEnded,
          isVisible: isVisible
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderCaptions", function (child, idx) {
      if (!child.props || !child.props.children) return child;
      var className = (0, _classnames.default)({
        animated: child.type === _Caption.default
      });
      var children = child.props.children;

      if (_this.state.captionsStarted.indexOf(idx) !== -1) {
        className = (0, _classnames.default)('animated', child.props.animation);
      }

      if (children.map) {
        children = children.map(function (item, ix) {
          return _this.renderCaptions(item, "".concat(idx, "_").concat(ix));
        });
      } else {
        children = _this.renderCaptions(children, "".concat(idx, "_0"));
      }

      var el = _react.default.cloneElement(child, {
        key: idx,
        children: children,
        className: className
      });

      if (_this.initCaptions && child.type === _Caption.default) _this.captions.push(el);

      if (_this.state.captionsEnded.indexOf(idx) !== -1 || _this.state.captionsStarted.indexOf(idx) === -1 && child.props.noDisplay) {
        return null;
      }

      return el;
    });

    _this.state = {
      captionsStarted: [],
      captionsEnded: [],
      isVisible: !props.start || props.start <= 0
    };
    _this.captions = [];
    _this.initCaptions = true;
    return _this;
  }
  /**
   * Lifecycle
   */


  _createClass(AudioCaptions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.audio.ontimeupdate = this.onTimeUpdate;
      this.initCaptions = false;
      if (this.props.autoPlay) this.audio.play();
    }
    /**
     * Plays the audio
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