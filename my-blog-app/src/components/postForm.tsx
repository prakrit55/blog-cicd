import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling/postForm.css'

import { createPost } from '../api/api';

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPost({ title, content, author });
      navigate('/success'); // Redirect to success page
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('An error occurred while creating your post. Please try again.'); // Set user-friendly error message
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="form-label">Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="textarea-field" />
        </div>
        <div>
          <label className="form-label">Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="input-field" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
  
};

export default PostForm;
