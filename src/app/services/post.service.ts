import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostRequest, UpdatePostRequest } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createPost(postData: CreatePostRequest): Observable<{ message: string; post: Post }> {
    return this.http.post<{ message: string; post: Post }>(`${this.apiUrl}/posts`, postData);
  }

  getAllPosts(): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.apiUrl}/posts`);
  }

  getPost(id: number): Observable<{ post: Post }> {
    return this.http.get<{ post: Post }>(`${this.apiUrl}/posts/${id}`);
  }

  updatePost(id: number, postData: UpdatePostRequest): Observable<{ message: string; post: Post }> {
    return this.http.put<{ message: string; post: Post }>(`${this.apiUrl}/posts/${id}`, postData);
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/posts/${id}`);
  }

  getUserPosts(userId: number): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.apiUrl}/users/${userId}/posts`);
  }
}
