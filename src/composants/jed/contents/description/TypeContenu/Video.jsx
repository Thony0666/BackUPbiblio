import React from 'react';
import ReactPlayer from 'react-player';

const Video = (props) => {
    console.log('console log de l url du video');
    console.log(props.videoUrl);
    return (
        <div>
            <ReactPlayer url={props.videoUrl} controls={true} width="100%" height="100%" />
            {/* <ReactPlayer
                url={'https://api.tafomihaavo.mg/tahiry/v1/file-public/stream/?hashFile=3477893cc05948318be1e40dbc18207c'}
                controls={true}
                width="100%"
                height="100%"
            /> */}
        </div>
    );
};

export default Video;
