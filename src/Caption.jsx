/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

const Caption = props => (
  <div className={props.className}>
    {props.children}
  </div>
);

Caption.defaultProps = {
  animation: 'bounceInRight'
};

export default Caption;
