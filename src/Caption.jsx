/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

const Caption = props => (
  React.createElement(props.tagName, {
    className: props.className,
    children: props.children
  })
);

Caption.defaultProps = {
  animation: 'bounceInRight',
  tagName: 'div'
};

export default Caption;
