import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateRecipe = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [storyText, setStoryText] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        // Frontend validations
        let validationErrors = {};
        if (title.length < 3) validationErrors.title = "Title must be at least 3 characters long";
        if (author.length < 2) validationErrors.author = "Title must be at least 2 characters long";
        if (synopsis.length < 25) validationErrors.synopsis = "Synopsis must be at least 25 characters long";
        if (storyText.length < 25) validationErrors.storyText = "Story text must be at least 50 characters long";
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Creating a new book object
        const newStory = {
            title,
            author,
            synopsis,
            storyText

        };

        axios.post("http://localhost:9999/api/createStory", newStory)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            
            <button onClick={() => navigate('/')}>Back to Home</button>
            <h2>Add the next whimsical tale!</h2>
            <form onSubmit={submitHandler}>
                <div className='form-fields'>
                    <label>Story Title: </label>
                    <input 
                        type="text" 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                </div>
                <br/>
                <div className='form-fields'>
                    <label>Author: </label>
                    <input 
                        type="text" 
                        onChange={(e) => setAuthor(e.target.value)} 
                        value={author} 
                    />
                    {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
                </div>
                <br/>
                <div className='form-fields'>
                    <label>Synopsis </label>
                    <input 
                        type="text" 
                        onChange={(e) => setSynopsis(e.target.value)} 
                        value={synopsis} 
                    />
                    {errors.synopsis && <p style={{ color: 'red' }}>{errors.synopsis}</p>}
                </div>
                <br/>
                <div className='form-fields'>
                    <label htmlFor="storyText">Story</label>
                    <textarea name="storyText" id="storyText" value={storyText} onChange={(e) => setStoryText(e.target.value)}  rows="15" cols="30"></textarea>
                    {errors.storyText && <p style={{ color: 'red' }}>{errors.storyText}</p>}
                </div>
                <button type="submit" className='submit-btn'>Create Story!</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
