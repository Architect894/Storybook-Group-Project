// BackgroundWrapper.jsx
import React from 'react';

const BackgroundWrapper = ({ backgroundImage, children }) => {
    const wrapperStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Ensures the background stays in place while scrolling
        width: '68vw',
        height: '100vh',
        overflow: 'auto', // Allows scrolling if content overflows
    };

    return <div style={wrapperStyle}>{children}</div>;
};

export default BackgroundWrapper;
