const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const UsersController = require('../controllers/UsersController');
const PostsController = require('../controllers/PostsController');
const CommentsController = require('../controllers/CommentsController');
const LikesController = require('../controllers/LikesController');

const router = express.Router();

// Public routes (no authentication required)
router.post('/auth/register', UsersController.register);
router.post('/auth/login', UsersController.login);

// Protected routes (authentication required)
// User routes
router.get('/users/profile', authenticateToken, UsersController.getProfile);
router.put('/users/profile', authenticateToken, UsersController.updateProfile);
router.get('/users', authenticateToken, UsersController.getAllUsers);

// Post routes
router.post('/posts', authenticateToken, PostsController.createPost);
router.get('/posts', authenticateToken, PostsController.getAllPosts);
router.get('/posts/:id', authenticateToken, PostsController.getPost);
router.put('/posts/:id', authenticateToken, PostsController.updatePost);
router.delete('/posts/:id', authenticateToken, PostsController.deletePost);
router.get('/users/:userId/posts', authenticateToken, PostsController.getUserPosts);

// Comment routes
router.post('/comments', authenticateToken, CommentsController.createComment);
router.get('/posts/:postId/comments', authenticateToken, CommentsController.getPostComments);
router.get('/comments/:id', authenticateToken, CommentsController.getComment);
router.put('/comments/:id', authenticateToken, CommentsController.updateComment);
router.delete('/comments/:id', authenticateToken, CommentsController.deleteComment);

// Like routes
router.post('/posts/:postId/like', authenticateToken, LikesController.togglePostLike);
router.post('/comments/:commentId/like', authenticateToken, LikesController.toggleCommentLike);
router.get('/posts/:postId/likes', authenticateToken, LikesController.getPostLikes);
router.get('/comments/:commentId/likes', authenticateToken, LikesController.getCommentLikes);
router.get('/posts/:postId/like/check', authenticateToken, LikesController.checkPostLike);
router.get('/comments/:commentId/like/check', authenticateToken, LikesController.checkCommentLike);

module.exports = router;
