import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CreateStory from './components/CreateStory';
import DisplayAll from './components/DisplayAll';
import DisplayOneStory from './components/DisplayOne';
import UpdatedStory from './components/UpdatedStory';
import HomePage from './views/HomePage';
import './App.css';
import fairyImage from './assets/FAIRY_UNIVERSE.png'

// Layout component for navigation buttons
const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Storybook</h1>
      <img src={fairyImage}></img>
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
