import React, { useState } from 'react';
import DisplayAll from '../components/DisplayAll';

const HomePage = () => {
    const [storyList, setStoryList] = useState([]);

    return (
        <div>
            <DisplayAll storyList={storyList} setStoryList={setStoryList} />
        </div>
    );
}

export default HomePage;
