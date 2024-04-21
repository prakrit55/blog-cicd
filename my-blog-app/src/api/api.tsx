// api.ts
import axios from 'axios';

const API_URL = 'cc-demo-app-alb-1963131864.ap-south-1.elb.amazonaws.com/api';

export const fetchPosts = async () => {
  const response = await axios.get<any[]>(`${API_URL}/api/posts`);
  return response.data;
};

export const fetchPost = async (postId: string | any) => {
  const response = await axios.get<any>(`${API_URL}/api/posts/${postId}`);
  return response.data; // Ensure that response.data contains the expected post data
};

export const createPost = async (postData: any) => {
  const response = await axios.post<any>(`${API_URL}/api/posts`, postData);
  return response.data;
};

export const deletePost = async (postId: string | any) => {
  const response = await axios.delete<any>(`${API_URL}/api/posts/${postId}`);
  return response.data;
};