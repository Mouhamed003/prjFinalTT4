import { User } from './user.model';

export interface Like {
  id: number;
  userId: number;
  postId?: number;
  commentId?: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
}
