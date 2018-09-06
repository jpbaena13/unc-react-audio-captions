import React from 'react';

import classNames from 'classnames';
import Caption from './Caption';

class AudioCaptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      captionsStarted: [],
      captionsEnded: [],
      isVisible: !props.start || props.start <= 0
    };

    this.captions = [];
    this.initCaptions = true;
  }

  /**
   * Lifecycle
   */
  componentDidMount() {
    this.audio.ontimeupdate = this.onTimeUpdate;
    this.initCaptions = false;

    if (this.props.autoPlay) this.audio.play();
  }

  /**
   * Plays the audio
   */
  playAudio = () => {
    this.audio.play();
  }

  /**
   * Pauses the audio
   */
  pauseAudio = () => {
    this.audio.pause();
  }

  /**
   * Checks the start and end time for each caption and updates the state to the app
   * with the captions to show.
   */
  onTimeUpdate = () => {
    const { audio } = this;
    const captionsStarted = [...this.state.captionsStarted];
    const captionsEnded = [...this.state.captionsEnded];
    let { isVisible } = this.state;
    let update = false;

    this.captions.forEach((caption) => {
      const idxStarted = captionsStarted.indexOf(caption.key);
      const idxEnded = captionsEnded.indexOf(caption.key);

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

    if (!isVisible && this.props.start < parseInt(audio.currentTime, 10)) {
      isVisible = true;
      update = true;
    }

    if (update) {
      this.setState({
        captionsStarted,
        captionsEnded,
        isVisible
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

    let className = classNames({ animated: child.type === Caption });
    let { children } = child.props;

    if (this.state.captionsStarted.indexOf(idx) !== -1) {
      className = classNames('animated', child.props.animation);
    }

    if (children.map) {
      children = children.map((item, ix) => this.renderCaptions(item, `${idx}_${ix}`));
    } else {
      children = this.renderCaptions(children, `${idx}_0`);
    }

    const el = React.cloneElement(child, {
      key: idx,
      children,
      className
    });

    if (this.initCaptions && child.type === Caption) this.captions.push(el);

    if (this.state.captionsEnded.indexOf(idx) !== -1
        || (this.state.captionsStarted.indexOf(idx) === -1 && child.props.noDisplay)) {
      return null;
    }

    return el;
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
