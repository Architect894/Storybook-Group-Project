import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateStory from './components/CreateStory';
import DisplayAll from './components/DisplayAll';
import DisplayOneStory from './components/DisplayOne';
import UpdatedStory from './components/UpdatedStory';
import HomePage from './views/HomePage';
import './App.css';

// Layout component for navigation buttons

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <img src="./src/assets/storybook_title.png" alt="Storybook Image" className="layout-image" />
      <div>
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/catalog" element={<Layout><DisplayAll /></Layout>} />
          <Route path="/create" element={<Layout><CreateStory /></Layout>} />
          <Route path="/story/:id" element={<Layout><DisplayOneStory /></Layout>} />
          <Route path="/story/:id/edit" element={<Layout><UpdatedStory /></Layout>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
