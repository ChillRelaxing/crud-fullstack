import axios from 'axios';
import { User, Post, CreateUserDto, UpdateUserDto, CreatePostDto, UpdatePostDto } from '../types';

// En producción, la API está en la misma URL (Railway)
// En desarrollo, usar localhost:3000
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:3000/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => api.post<User>('/users', data),
  update: (id: number, data: UpdateUserDto) => api.put<User>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

// Post API
export const postApi = {
  getAll: () => api.get<Post[]>('/posts'),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  getByUser: (userId: number) => api.get<Post[]>(`/posts/user/${userId}`),
  create: (data: CreatePostDto) => api.post<Post>('/posts', data),
  update: (id: number, data: UpdatePostDto) => api.put<Post>(`/posts/${id}`, data),
  delete: (id: number) => api.delete(`/posts/${id}`),
};
