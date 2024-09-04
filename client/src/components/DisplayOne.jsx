import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundWrapper from '../components/BackgroundWrapper'; // Adjust the path if needed
import passageBackground from '../assets/passage-background.webp'; // Update with the correct path to your background image

const DisplayOneStory = () => {
    const { id } = useParams(); // Get the story ID from the route parameters
    const [oneStory, setOneStory] = useState(null); // Initialize state with null to check loading state
    const navigate = useNavigate(); // Initialize the navigate function for redirection

    // Fetch the story details when the component mounts or when the ID changes
    useEffect(() => {
        axios.get(`http://localhost:9999/api/findOneStory/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                // Clear state with the next line
                setOneStory(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, [id]);

    // Function to handle story deletion and navigate back to the catalog
    const deleteStory = () => {
        axios.delete(`http://localhost:9999/api/deleteStory/${id}`)
            .then(() => {
                navigate('/'); // Redirect to the catalog page after deletion
            })
            .catch((err) => {
                console.log('Error deleting story:', err);
            });
    };

    // If story data is still being fetched, show a loading message
    if (!oneStory) {
        return <div>Loading...</div>;
    }

    // Render the story details in a side-by-side table and the delete button
    return (
        <BackgroundWrapper backgroundImage={passageBackground}>
            <div>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
            <div className='displayOne-page flex-container'>
                <h2 className='displayOne-header'>{oneStory.title}</h2>
                <img src={oneStory.imageUrl} className='pexels-image-display-one' />
                <h4 className='byline'>By: {oneStory.author}</h4>
                <p>{oneStory.storyText}</p>
                <button onClick={deleteStory}>Delete</button>
            </div>
        </BackgroundWrapper>
    );
}

export default DisplayOneStory;
