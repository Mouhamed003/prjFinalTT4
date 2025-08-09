import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CreateCommentRequest, UpdateCommentRequest } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createComment(commentData: CreateCommentRequest): Observable<{ message: string; comment: Comment }> {
    return this.http.post<{ message: string; comment: Comment }>(`${this.apiUrl}/comments`, commentData);
  }

  getPostComments(postId: number): Observable<{ comments: Comment[] }> {
    return this.http.get<{ comments: Comment[] }>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  getComment(id: number): Observable<{ comment: Comment }> {
    return this.http.get<{ comment: Comment }>(`${this.apiUrl}/comments/${id}`);
  }

  updateComment(id: number, commentData: UpdateCommentRequest): Observable<{ message: string; comment: Comment }> {
    return this.http.put<{ message: string; comment: Comment }>(`${this.apiUrl}/comments/${id}`, commentData);
  }

  deleteComment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/comments/${id}`);
  }
}
