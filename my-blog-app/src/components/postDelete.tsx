// PostDeleteButton.tsx
import React from 'react';
import axios from 'axios';
// import './styling/postDetail.css'

interface Props {
  postId: string;
  onDelete: (postId: string) => void;
}

const PostDeleteButton: React.FC<Props> = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      onDelete(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default PostDeleteButton;
