import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackgroundWrapper from '../components/BackgroundWrapper'; // Adjust the path if needed
import editStoryBackground from '../assets/edit_img.webp'; // Update with the correct path to your background image

const UpdateStory = (props) => {
    const { id } = useParams(); 

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [storyText, setStoryText] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9999/api/findOneStory/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setSynopsis(res.data.synopsis);
                setStoryText(res.data.storyText);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Frontend validations
        let validationErrors = {};
        if (title.length < 3) validationErrors.title = "Title must be at least 3 characters long";
        if (author.length < 2) validationErrors.author = "Title must be at least 2 characters long";
        if (synopsis.length < 25) validationErrors.synopsis = "Synopsis must be at least 25 characters long";
        if (storyText.length < 50) validationErrors.storyText = "Story text must be at least 50 characters long";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios.put(`http://localhost:9999/api/updateStory/${id}`, {
            title,
            author,
            synopsis,
            storyText
        })
            .then((res) => {
                console.log(res);
                navigate('/'); // Navigate to home after updating
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <BackgroundWrapper backgroundImage={editStoryBackground}>
            <button onClick={() => navigate(`/story/${id}`)}>Story Details</button> 
            <h2>Edit your story</h2>
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
                <button type="submit" className='submit-btn'>Update!</button>
            </form>
        </BackgroundWrapper>
    )
}

export default UpdateStory;
