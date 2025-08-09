import { User } from './user.model';
import { Like } from './like.model';

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  author?: User;
  likes?: Like[];
}

export interface CreateCommentRequest {
  content: string;
  postId: number;
}

export interface UpdateCommentRequest {
  content: string;
}
