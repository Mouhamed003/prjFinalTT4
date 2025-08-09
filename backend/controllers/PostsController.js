const { Post, User, Comment, Like } = require('../models');

class PostsController {
  // Create new post
  static async createPost(req, res) {
    try {
      const { title, content, imageUrl } = req.body;
      
      const post = await Post.create({
        title,
        content,
        imageUrl,
        userId: req.user.id
      });

      // Fetch the post with author information
      const postWithAuthor = await Post.findByPk(post.id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.status(201).json({
        message: 'Post created successfully',
        post: postWithAuthor
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all posts
  static async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'firstName', 'lastName']
              }
            ]
          },
          {
            model: Like,
            as: 'likes',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'username']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json({ posts });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get single post
  static async getPost(req, res) {
    try {
      const { id } = req.params;
      
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'firstName', 'lastName']
              }
            ]
          },
          {
            model: Like,
            as: 'likes',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'username']
              }
            ]
          }
        ]
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json({ post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update post
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content, imageUrl } = req.body;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if user owns the post
      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only edit your own posts' });
      }

      await post.update({ title, content, imageUrl });

      const updatedPost = await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.json({
        message: 'Post updated successfully',
        post: updatedPost
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete post
  static async deletePost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if user owns the post
      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own posts' });
      }

      await post.destroy();

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get posts by user
  static async getUserPosts(req, res) {
    try {
      const { userId } = req.params;

      const posts = await Post.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'firstName', 'lastName']
              }
            ]
          },
          {
            model: Like,
            as: 'likes'
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.json({ posts });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PostsController;
