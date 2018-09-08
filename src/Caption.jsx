/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import classNames from 'classnames';

class Caption extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      classname: 'animated',
      noDisplay: false
    };

    this.props.listeners.push(this.onListener);
  }

  /**
   * This functions is added to parent's listeners array.
   * Update the state of the component according its props.
   *
   * @param  {int} currentTime Audio current time from parent.
   */
  onListener = (currentTime) => {
    if (this.props.start <= currentTime && this.state.classname === 'animated') {
      this.setState({
        classname: classNames('animated', this.props.animation),
        noDisplay: false
      });
    } else if (this.props.start > currentTime && this.state.classname !== 'animated') {
      this.setState({
        classname: 'animated',
        noDisplay: false
      });
    }

    if ((this.props.end && this.props.end < currentTime)
        || (this.props.start > currentTime && this.props.noDisplay)) {
      this.setState({
        noDisplay: true
      });
    } else if (this.state.noDisplay) {
      this.setState({
        noDisplay: false
      });
    }
  }

  /**
   * Render method.
   */
  render() {
    return (
      React.createElement(this.props.tagName, {
        className: this.state.classname,
        children: this.props.children,
        style: { display: this.state.noDisplay && 'none' }
      })
    );
  }
}

Caption.defaultProps = {
  animation: 'bounceInRight',
  tagName: 'div'
};

export default Caption;
