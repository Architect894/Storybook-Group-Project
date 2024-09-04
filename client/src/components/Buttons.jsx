import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Storybook</h1>
            <nav>
                <button onClick={() => navigate('/')}>Back to home</button>
                <button onClick={() => navigate('/create')}>Add Story!</button>
            </nav>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
