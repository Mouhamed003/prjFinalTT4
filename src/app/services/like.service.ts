import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  togglePostLike(postId: number): Observable<{ message: string; liked: boolean }> {
    return this.http.post<{ message: string; liked: boolean }>(`${this.apiUrl}/posts/${postId}/like`, {});
  }

  toggleCommentLike(commentId: number): Observable<{ message: string; liked: boolean }> {
    return this.http.post<{ message: string; liked: boolean }>(`${this.apiUrl}/comments/${commentId}/like`, {});
  }

  getPostLikes(postId: number): Observable<{ likes: Like[]; count: number }> {
    return this.http.get<{ likes: Like[]; count: number }>(`${this.apiUrl}/posts/${postId}/likes`);
  }

  getCommentLikes(commentId: number): Observable<{ likes: Like[]; count: number }> {
    return this.http.get<{ likes: Like[]; count: number }>(`${this.apiUrl}/comments/${commentId}/likes`);
  }

  checkPostLike(postId: number): Observable<{ liked: boolean }> {
    return this.http.get<{ liked: boolean }>(`${this.apiUrl}/posts/${postId}/like/check`);
  }

  checkCommentLike(commentId: number): Observable<{ liked: boolean }> {
    return this.http.get<{ liked: boolean }>(`${this.apiUrl}/comments/${commentId}/like/check`);
  }
}
