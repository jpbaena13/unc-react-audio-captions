## Install

Install it with npm (`npm install unc-react-audio-captions --save`). Here's a simple example:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { AudioCaptions, Caption } from 'unc-react-audio-captions';

import 'animate.css/animate.min.css';

render(
  <AudioCaptions src="audio.mp3" controls autoPlay>
    <Caption start="2">
      Caption starting in second 2
      <div>
        <Caption start="4">
          Embedded Caption
        </Caption>
      </div>
    </Caption>

    <Caption start="3" animation="rotateIn">
      <h4>Caption with diferent animation</h4>
    </Caption>

    <Caption start="4" noDisplay>
      Caption with display:none
    </Caption>

    <Caption start="5" end="6">
      Caption that ends in the second 6
    </Caption>
  </AudioCaptions>,
  document.getElementById('app')
);
```

## Documentation

Documentation and demo can be found here: http://jpbaena13.github.io/unc-react-audio-captions/