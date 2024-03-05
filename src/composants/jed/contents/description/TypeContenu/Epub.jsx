import React, { useState } from 'react';
import { ReactReader } from 'react-reader';
import epubUrl from '../testfiles/epub/alice.epub';

const Epub = () => {
    const [location, setLocation] = useState(2);

    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
    };

    return (
        <div>
            <ReactReader url={epubUrl} location={location} locationChanged={handleLocationChange} />
        </div>
    );
};

export default Epub;
