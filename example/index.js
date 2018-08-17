/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import { AudioCaptions, Caption } from '../src';

import 'animate.css/animate.min.css';

render(
  <AudioCaptions src="audio.mp3" controls>
    <Caption start="2" end="5">
      <strong><i>"Caption 1"</i></strong>
    </Caption>

    <Caption start="3" animation="rotateIn">
      <h2>Caption 2</h2>
    </Caption>

    <Caption start="5">
      Caption 3
    </Caption>

    <Caption start="6">
      Caption 4
    </Caption>

    <Caption start="7">
      <h2>Caption 5</h2>
    </Caption>

    <Caption start="8">
      Caption 6
    </Caption>

    <Caption start="10" noDisplay>
      Caption 7 <br />
    </Caption>
  </AudioCaptions>,
  document.getElementById('app')
);
