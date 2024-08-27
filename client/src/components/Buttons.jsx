import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Speedy Meals</h1>
            <nav>
                <button onClick={() => navigate('/')}>Back to home</button>
                <button onClick={() => navigate('/create')}>Add Recipe!</button>
            </nav>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
