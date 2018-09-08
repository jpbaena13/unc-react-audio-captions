/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import { AudioCaptions, Caption } from '../src';

import 'animate.css/animate.min.css';

function App() {
  let captions;

  const handlerClick = () => {
    captions.playAudio();
  };

  const handlerClickP = () => {
    captions.pauseAudio();
  };

  return (
    <div>
      <button onClick={handlerClick}>Play</button>
      <button onClick={handlerClickP}>Pause</button>
       <AudioCaptions src="audio.mp3" controls ref={ (el) => { captions = el; } } start='1' autoPlay>
        <Caption start="2">
          <strong><i>"Caption 1"</i></strong>
          <Caption start="4">
            <div>Caption 1.1</div>
            <Caption start="6">
              <div>Caption 1.1.1</div>
            </Caption>
          </Caption>
        </Caption>

        <Caption start="3" animation="rotateIn" tagName='span' noDisplay>
          <h2>Caption 2</h2>
          <span>
            <Caption start='4'>
              <h3>Caption 2.1</h3>
            </Caption>
          </span>
        </Caption>

        <Caption start="5">
          Caption 3
        </Caption>

        <Caption start="6">
          Caption 4
        </Caption>

        <Caption start="7" end="9">
          <h2>Caption 5</h2>
        </Caption>

        <Caption start="8">
          Caption 6
        </Caption>

        <Caption start="10" noDisplay>
          Caption 7 <br />
        </Caption>
      </AudioCaptions>
    </div>
  );
}

render(
  <App />,
  document.getElementById('app')
);
