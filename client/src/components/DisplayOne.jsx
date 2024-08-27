import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { updateRecipe } from '../../../Server/controllers/recipe.controller';

const DisplayOneStory = () => {
    const { id } = useParams(); // Get the recipe ID from the route parameters
    const [oneStory, setOneRecipe] = useState(null); // Initialize state with null to check loading state
    const navigate = useNavigate(); // Initialize the navigate function for redirection

    // Fetch the recipe details when the component mounts or when the ID changes
    useEffect(() => {
        axios.get(`http://localhost:9999/api/findOneStory/${id}`)
            .then((res) => {
                setOneRecipe(res.data);
            })
            .catch((err) => {
                console.log('Error fetching recipe details:', err);
            });
    }, [id]);

    // Function to handle recipe deletion and navigate back to the catalog
    const deleteRecipe = () => {
        axios.delete(`http://localhost:9999/api/deleteStory/${id}`)
            .then(() => {
                navigate('/'); // Redirect to the catalog page after deletion
            })
            .catch((err) => {
                console.log('Error deleting story:', err);
            });
    };

    // If recipe data is still being fetched, show a loading message
    if (!oneStory) {
        return <div>Loading...</div>;
    }

    // Render the recipe details in a side-by-side table and the delete button
    return (
        <div>
            <div>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
            <div className='displayOne-page'>
                <h2 className='displayOne-header'>{oneStory.title}</h2>
                <h4>{oneStory.author}</h4>
                <p>{oneStory.storyText}</p>
                <button onClick={deleteRecipe}>Delete</button>
            </div>
        </div>
    );
}

export default DisplayOneStory;
