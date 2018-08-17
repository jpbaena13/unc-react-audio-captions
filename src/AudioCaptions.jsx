import React from 'react';

class AudioCaptions extends React.Component {
  constructor(props) {
    super(props);

    this.onTimeUpdate = this.onTimeUpdate.bind(this);

    this.state = {
      captionsStarted: [],
      captionsEnded: []
    };
  }

  /**
   * Lifecycle
   */
  componentDidMount() {
    this.audio.ontimeupdate = this.onTimeUpdate;
    this.audio.play();
  }

  /**
   * Checks the start and end time for each caption and updates the state to the app
   * with the captions to show.
   */
  onTimeUpdate() {
    const { audio } = this;
    const captionsStarted = [...this.state.captionsStarted];
    const captionsEnded = [...this.state.captionsEnded];
    let update = false;

    this.props.children.forEach((caption, idx) => {
      const idxStarted = captionsStarted.indexOf(idx);
      const idxEnded = captionsEnded.indexOf(idx);

      if (caption.props.start <= parseInt(audio.currentTime, 10)) {
        if (idxStarted === -1) {
          update = captionsStarted.push(idx);
        }

        if (!caption.props.end || caption.props.end >= parseInt(audio.currentTime, 10)) {
          if (idxEnded !== -1) {
            update = captionsEnded.splice(idxEnded, 1);
          }
        } else if (idxEnded === -1) {
          update = captionsEnded.push(idx);
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

    if (update) {
      this.setState({
        captionsStarted,
        captionsEnded
      });
    }
  }

  /**
   * Render method
   */
  render() {
    return (
      <div className="unc-captions">

        {this.props.children.map((caption, idx) => {
          let className = 'animated';

          if (this.state.captionsStarted.indexOf(idx) !== -1) {
            className += ` ${caption.props.animation}`;

            if (this.state.captionsEnded.indexOf(idx) !== -1) {
              return null;
            }
          } else if (caption.props.noDisplay) {
            return null;
          }

          return React.cloneElement(caption, {
            key: idx,
            className
          });
        })}

        <audio src={this.props.src}
               controls={this.props.controls}
               autoPlay={this.props.autoPlay}
               ref={ (ref) => { this.audio = ref; }}/>
      </div>
    );
  }
}

export default AudioCaptions;
