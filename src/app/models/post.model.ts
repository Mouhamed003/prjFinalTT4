import { User } from './user.model';
import { Comment } from './comment.model';
import { Like } from './like.model';

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  author?: User;
  comments?: Comment[];
  likes?: Like[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}
