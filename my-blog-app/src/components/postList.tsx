// AllPosts.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/api';
import './styling/postList.css'

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div className="page-container">
      <div className="content">
        <h2 className="allposts">All Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <div className="post-container">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-author">Author: {post.author}</p>
              <div className="link-container">
                <Link to={`/posts/${post._id}`} className="link">View Details</Link>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllPosts;
