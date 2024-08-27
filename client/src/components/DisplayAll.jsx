import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
        <div>
            <button onClick={() => navigate('/create')}>Add a story!</button>
            <h2>Let whimsical winds and charitable bells guide you through these stories!</h2>
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
                                <td>
                                    <p>{story.title}</p>
                                </td>
                                <td>
                                    <p>{story.author}</p>
                                </td>
                                <td>
                                    <p>{story.synopsis}</p>
                                </td>
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
        </div>
    );
};

export default DisplayAll;
