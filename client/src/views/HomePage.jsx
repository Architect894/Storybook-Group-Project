import React, { useState } from 'react';
import DisplayAll from '../components/DisplayAll';
import BackgroundWrapper from '../components/BackgroundWrapper'; // Adjust the path if needed
import homeBackground from '../assets/FAIRY_UNIVERSE.png'; // Update with the correct path to your background image

const HomePage = () => {
    const [storyList, setStoryList] = useState([]);

    return (
        <BackgroundWrapper backgroundImage={homeBackground}>
            <DisplayAll storyList={storyList} setStoryList={setStoryList} />
        </BackgroundWrapper>
    );
}

export default HomePage;
