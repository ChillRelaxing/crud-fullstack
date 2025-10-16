import { Request, Response } from 'express';
import prisma from '../db';

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
      },
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Create post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, published, authorId } = req.body;
    
    if (!title || !authorId) {
      return res.status(400).json({ error: 'Title and authorId are required' });
    }
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: Number(authorId),
      },
      include: {
        author: true,
      },
    });
    
    res.status(201).json(post);
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Author not found' });
    }
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published }),
      },
      include: {
        author: true,
      },
    });
    
    res.json(post);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(500).json({ error: 'Error deleting post' });
  }
};

// Get posts by user
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const posts = await prisma.post.findMany({
      where: { authorId: Number(userId) },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};
