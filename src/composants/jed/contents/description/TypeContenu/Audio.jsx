import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const Audio = (props) => {
    return (
        <div>
            <ReactAudioPlayer src={props.audioUrl} autoPlay={false} controls />
        </div>
    );
};

export default Audio;
