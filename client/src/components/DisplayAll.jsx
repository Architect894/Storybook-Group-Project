import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundWrapper from './BackgroundWrapper'; // Import the BackgroundWrapper component
import fairyImage from '../assets/home-background.webp'

const DisplayAll = ({ storyList = [], setStoryList }) => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:9999/api/findAllStories")
            .then((res) => {
                setStoryList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching stories:", err);
            });
    }, [setStoryList]);

    return (
        <BackgroundWrapper backgroundImage={fairyImage}>
            <h2>May whimsical winds and charitable bells guide you along these stories!</h2>
            <button onClick={() => navigate('/create')}>Add a story!</button>
            {storyList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Synopsis</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storyList.map((story) => (
                            <tr key={story._id}>
                                <td><p>{story.title}</p></td>
                                <td><p>{story.author}</p></td>
                                <td><p>{story.synopsis}</p></td>
                                <td>
                                    <Link to={`/story/${story._id}/edit`}>
                                        <button className='optionbttns special-btn edit-btn'>Edit</button>
                                    </Link>
                                    <Link to={`/story/${story._id}`}>
                                        <button className='optionbttns special-btn details-btn'>Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books a' writin.</p>
            )}
        </BackgroundWrapper>
    );
};

export default DisplayAll;
