import React from 'react';

import classNames from 'classnames';
import Caption from './Caption';

class AudioCaptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: !props.start || props.start <= 0
    };

    this.listeners = [];
  }

  /**
   * Lifecycle
   */
  componentDidMount() {
    this.audio.ontimeupdate = this.onTimeUpdate;
  }

  /**
   * Plays the audio
   *
   * @param {int} currentTime Indicates the position for the playback in seconds.
   */
  playAudio = (currentTime) => {
    if (currentTime) this.audio.currentTime = currentTime;
    this.audio.play();
  }

  /**
   * Pauses the audio
   */
  pauseAudio = () => {
    this.audio.pause();
  }

  /**
   * Runs every callback function added from children with type 'Caption'.
   */
  onTimeUpdate = () => {
    const { audio } = this;
    const currentTime = parseInt(audio.currentTime, 10);

    this.listeners.forEach((callback) => {
      callback(currentTime);
    });

    if (this.props.onTimeUpdate) this.props.onTimeUpdate(currentTime);

    if (!this.state.isVisible && this.props.start < parseInt(audio.currentTime, 10)) {
      this.setState({
        isVisible: true
      });
    }
  }

  /**
   * Recursive function that returns a Caption component and
   * looking for other captions within the children.
   *
   * @param  {Object} child from Array of children of a Caption component.
   *
   * @return {Caption}          Caption component to render.
   */
  renderCaptions = (child, idx) => {
    if (!child.props || !child.props.children) return child;

    let { children } = child.props;

    if (children.map) {
      children = children.map((item, ix) => this.renderCaptions(item, `${idx}_${ix}`));
    } else {
      children = this.renderCaptions(children, `${idx}_0`);
    }

    return React.cloneElement(child, {
      key: idx,
      children,
      listeners: child.type === Caption ? this.listeners : undefined
    });
  }

  /**
   * Render method
   */
  render() {
    const className = classNames(
      'unc-captions',
      this.props.className, {
        animated: this.props.start,
        [`${this.props.animation}`]: this.props.start && this.state.isVisible
      }
    );

    return (
      <div className={className}>

        {(this.props.children.map
          && this.props.children.map((child, idx) => this.renderCaptions(child, `${idx}`)))
          || this.renderCaptions(this.props.children, '0')}

        <audio src={this.props.src}
               controls={this.props.controls}
               autoPlay={this.props.autoPlay}
               ref={ (ref) => { this.audio = ref; }}/>
      </div>
    );
  }
}

AudioCaptions.defaultProps = {
  animation: 'bounceInRight'
};

export default AudioCaptions;
