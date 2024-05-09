// api.ts
import axios from 'axios';

const API_URL = 'loadbalancer-url/api';

export const fetchPosts = async () => {
  try {
    const response = await axios.get<any[]>(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Optionally rethrow the error to handle it in the calling function
  }
};


export const fetchPost = async (postId: string | any) => {
  const response = await axios.get<any>(`${API_URL}/posts/${postId}`);
  return response.data; // Ensure that response.data contains the expected post data
};

export const createPost = async (postData: any) => {
  const response = await axios.post<any>(`${API_URL}/posts`, postData);
  return response.data;
};

export const deletePost = async (postId: string | any) => {
  const response = await axios.delete<any>(`${API_URL}/posts/${postId}`);
  return response.data;
};