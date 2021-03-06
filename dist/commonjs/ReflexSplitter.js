'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Browser = require('./Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////////////////////////////////////////////
// ReflexSplitter
// By Philippe Leefsma
// December 2016
//
///////////////////////////////////////////////////////////
var ReflexSplitter = function (_React$Component) {
  (0, _inherits3.default)(ReflexSplitter, _React$Component);

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  function ReflexSplitter(props) {
    (0, _classCallCheck3.default)(this, ReflexSplitter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReflexSplitter.__proto__ || (0, _getPrototypeOf2.default)(ReflexSplitter)).call(this, props));

    _this.state = {
      active: false
    };

    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    _this.document = props.document;
    return _this;
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////


  (0, _createClass3.default)(ReflexSplitter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.document.addEventListener('touchend', this.onMouseUp);

      this.document.addEventListener('mouseup', this.onMouseUp);

      this.document.addEventListener('mousemove', this.onMouseMove);

      this.document.addEventListener('touchmove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      this.document.removeEventListener('mouseup', this.onMouseUp);

      this.document.removeEventListener('touchend', this.onMouseUp);

      this.document.removeEventListener('mousemove', this.onMouseMove);

      this.document.removeEventListener('touchmove', this.onMouseMove);
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {

      if (this.state.active) {

        this.props.events.emit('splitter.resize', {
          splitter: this,
          event: event
        });

        if (this.props.onResize) {

          this.props.onResize({
            domElement: _reactDom2.default.findDOMNode(this),
            component: this
          });
        }

        event.stopPropagation();
        event.preventDefault();
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {

      this.setState({
        active: true
      });

      if (this.props.onStartResize) {

        // cancels resize from controller
        // if needed by returning true
        // to onStartResize
        if (this.props.onStartResize({
          domElement: _reactDom2.default.findDOMNode(this),
          component: this
        })) {

          event.stopPropagation();
          event.preventDefault();

          return;
        }
      }

      this.props.events.emit('splitter.startResize', {
        splitter: this,
        event: event
      });

      event.stopPropagation();
      event.preventDefault();
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'onMouseUp',
    value: function onMouseUp(event) {

      if (this.state.active) {

        this.setState({
          active: false
        });

        if (this.props.onStopResize) {

          this.props.onStopResize({
            domElement: _reactDom2.default.findDOMNode(this),
            component: this
          });
        }

        this.props.events.emit('splitter.stopResize', {
          splitter: this,
          event: event
        });
      }
    }

    /////////////////////////////////////////////////////////
    //
    //
    /////////////////////////////////////////////////////////

  }, {
    key: 'render',
    value: function render() {

      var classNames = ['reflex-splitter'].concat((0, _toConsumableArray3.default)(this.props.className.split(' ')));

      if (_Browser2.default.isMobile()) {

        classNames.push('reflex-thin');
      }

      if (this.state.active) {

        classNames.push('active');
      }

      return _react2.default.createElement('div', { className: classNames.join(' '),
        onTouchStart: this.onMouseDown,
        onMouseDown: this.onMouseDown,
        style: this.props.style });
    }
  }]);
  return ReflexSplitter;
}(_react2.default.Component);

ReflexSplitter.propTypes = {
  onStartResize: _propTypes2.default.func,
  onStopResize: _propTypes2.default.func,
  className: _propTypes2.default.string,
  propagate: _propTypes2.default.bool,
  onResize: _propTypes2.default.func,
  style: _propTypes2.default.object };
ReflexSplitter.defaultProps = {
  onStartResize: null,
  onStopResize: null,
  propagate: false,
  onResize: null,
  className: '',
  style: {},
  document: document };
exports.default = ReflexSplitter;