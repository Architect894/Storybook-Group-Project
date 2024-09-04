import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackgroundWrapper from '../components/BackgroundWrapper'; // Import BackgroundWrapper
import fairyUniverseImage from '../assets/create-story.webp'; // Import the background image
import { Link } from 'react-router-dom';

const CreateStory = (props) => {
    const pexelsApiKey = import.meta.env.VITE_API_KEY;
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [imageSearchTerm, setImageSearchTerm] = useState("");
    const [imageChoices, setImageChoices] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [storyText, setStoryText] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Api key:", pexelsApiKey);
    }, []);

    const handleChangeSearch = e => {
        setImageSearchTerm(e.target.value);
    }

    const handleSubmitSearch = e => {
        e.preventDefault();
        axios.get(`https://api.pexels.com/v1/search?query=${imageSearchTerm}&per_page=4`, {
            headers: {
                Authorization: pexelsApiKey
            }
        })
            .then(res => {
                setImageChoices(res.data.photos);
                console.log(imageChoices);
                setSearchSubmitted(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const selectImage = (url) => {
        console.log(`image url is ${url}`);
        setImageUrl(url);
    }

    useEffect(() => {
        console.log('Updated imageUrl:', imageUrl);
    }, [imageUrl]);

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(`Selected image url: ${imageUrl}`);

        // Frontend validations
        let validationErrors = {};
        if (title.length < 3) validationErrors.title = "Title must be at least 3 characters long";
        if (author.length < 2) validationErrors.author = "Author name must be at least 2 characters long";
        if (synopsis.length < 25) validationErrors.synopsis = "Synopsis must be at least 25 characters long";
        if (storyText.length < 50) validationErrors.storyText = "Story text must be at least 50 characters long";
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Creating a new story object
        const newStory = {
            title,
            author,
            synopsis,
            storyText,
            imageUrl
        };

        console.log("new story is", newStory);

        axios.post("http://localhost:9999/api/createStory", newStory)
            .then((res) => {
                console.log(res);
                navigate('/');
                setImageChoices([]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <BackgroundWrapper backgroundImage={fairyUniverseImage}>
            <div className='flex-container'>
                <button onClick={() => navigate('/')}>Back to Home</button>
                <h2>Add the next whimsical tale!</h2>

                <div>
                    <h3 className='search-header'>First, search for an image to add to your story (optional):</h3>
                    <form onSubmit={handleSubmitSearch}>
                        <div className='form-fields-pic-search'>
                            <label htmlFor="imageSearch">Search for an image</label>
                            <input type="text" name="imageSearch" onChange={handleChangeSearch}  />
                            {/* <input type="submit" value="Search" className='pic-search-btn' /> */}
                            <button type="submit" className='pic-search-btn'>Search</button>
                        </div>
                    </form>

                    {
                        imageChoices && imageChoices.length > 0 ? (
                            <div className='image-choices-container'>
                                {imageChoices.map((image, index) => (
                                    <div key={index} className='flex-container-img'>
                                        <img src={image.src.medium} alt={image.alt} className="pexelsImage" />
                                        <button onClick={() => selectImage(image.src.medium)} className='image-btn'>Choose this image</button>
                                    </div>
                                ))}
                            </div>
                        ) : searchSubmitted ? (
                            <p>No images found. Try a different search term.</p>
                        ) : null
                    }
                </div>

                <form onSubmit={submitHandler} className='blockform'>
                    {imageUrl ? (<p>Image selected!</p>) : null}
                    <div className='form-fields'>
                        <label>Story Title: </label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                    </div>
                    <br />
                    <div className='form-fields'>
                        <label>Author: </label>
                        <input
                            type="text"
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                        {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
                    </div>
                    <br />
                    <div className='form-fields'>
                        <label>Synopsis </label>
                        <input
                            type="text"
                            onChange={(e) => setSynopsis(e.target.value)}
                            value={synopsis}
                        />
                        {errors.synopsis && <p style={{ color: 'red' }}>{errors.synopsis}</p>}
                    </div>
                    <br />
                    <div className='form-fields'>
                        <label htmlFor="storyText">Story</label>
                        <textarea name="storyText" id="storyText" value={storyText} onChange={(e) => setStoryText(e.target.value)} rows="15" cols="30"></textarea>
                        {errors.storyText && <p style={{ color: 'red' }}>{errors.storyText}</p>}
                    </div>
                    <button type="submit" className='submit-btn'>Create!</button>
                </form>
            </div>
        </BackgroundWrapper>
    );
}

export default CreateStory;
