export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}

export interface CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}
