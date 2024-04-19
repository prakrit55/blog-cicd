import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import { Link } from 'react-router-dom';

import PostList from './components/postList';
import PostDetail from './components/postDetail';
import PostForm from './components/postForm';
import SuccessPage from './components/successpage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
      <header>
        <h1 className="blog-title"> My Blog</h1>
        <nav>
          <ul>
            <li className="pio">
              <Link to="/create-post" className="create-button">📃 Create Blog</Link>
            </li>
          </ul>
        </nav>
      </header>
        <main>
          <Routes>
            <Route path="/" element={<PostList />} />  {/* Removed exact */}
            <Route path="/posts/:id" element={<PostDetail />} /> {/* Removed exact */}
            <Route path="/create-post" element={<PostForm />} />  {/* Removed exact */}
            <Route path="/edit-post/:id" element={<PostForm />} /> {/* Removed exact */}
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        <footer>
        <p>© 2024 My Blog. All rights reserved.</p>
      </footer>
      </div>
    </Router>
  );
};

export default App;