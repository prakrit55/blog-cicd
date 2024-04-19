// SinglePost.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost, deletePost } from '../api/api';
import './styling/postDetail.css'

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string | any }>();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchSinglePost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/'); // Redirect to home page after successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error appropriately
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postnmm-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <p className="post-author">Author: {post.author}</p>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );  
};

export default SinglePost;
