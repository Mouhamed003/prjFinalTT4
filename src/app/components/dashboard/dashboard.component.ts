import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { LikeService } from '../../services/like.service';
import { User } from '../../models/user.model';
import { Post, CreatePostRequest } from '../../models/post.model';
import { CreateCommentRequest } from '../../models/comment.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  posts: Post[] = [];
  isLoading = false;
  showCreatePost = false;
  
  newPost: CreatePostRequest = {
    title: '',
    content: '',
    imageUrl: ''
  };

  newComment: { [postId: number]: string } = {};

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService,
    private likeService: LikeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading = false;
      }
    });
  }

  createPost() {
    if (!this.newPost.title || !this.newPost.content) {
      return;
    }

    this.postService.createPost(this.newPost).subscribe({
      next: (response) => {
        this.posts.unshift(response.post);
        this.newPost = { title: '', content: '', imageUrl: '' };
        this.showCreatePost = false;
      },
      error: (error) => {
        console.error('Erreur lors de la création du post:', error);
        alert('Erreur lors de la création du post: ' + (error.error?.error || error.message));
      }
    });
  }

  addComment(postId: number) {
    const content = this.newComment[postId];
    if (!content) return;

    const commentData: CreateCommentRequest = {
      content,
      postId
    };

    this.commentService.createComment(commentData).subscribe({
      next: (response) => {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          if (!post.comments) post.comments = [];
          post.comments.push(response.comment);
        }
        this.newComment[postId] = '';
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      }
    });
  }

  toggleLike(postId: number) {
    this.likeService.togglePostLike(postId).subscribe({
      next: (response) => {
        const post = this.posts.find(p => p.id === postId);
        if (post && post.likes) {
          if (response.liked) {
            // Add like
            post.likes.push({
              id: 0,
              userId: this.currentUser!.id,
              postId: postId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              user: this.currentUser!
            });
          } else {
            // Remove like
            post.likes = post.likes.filter(like => like.userId !== this.currentUser!.id);
          }
        }
      },
      error: (error) => {
        console.error('Error toggling like:', error);
      }
    });
  }

  isLikedByCurrentUser(post: Post): boolean {
    if (!post.likes || !this.currentUser) return false;
    return post.likes.some(like => like.userId === this.currentUser!.id);
  }

  getLikesCount(post: Post): number {
    return post.likes ? post.likes.length : 0;
  }

  getCommentsCount(post: Post): number {
    return post.comments ? post.comments.length : 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getUsername(username?: string): string {
    return username ? `@${username}` : '';
  }

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }

  trackByCommentId(index: number, comment: any): number {
    return comment.id;
  }
}
