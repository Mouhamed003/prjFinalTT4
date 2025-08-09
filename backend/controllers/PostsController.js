const { Post, User, Comment, Like } = require('../models');

class PostsController {
  static async createPost(req, res) {
    try {
      const { title, content, imageUrl } = req.body;
      
      const post = await Post.create({
        title,
        content,
        imageUrl,
        userId: req.user.id
      });

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
        message: 'Post créé avec succès',
        post: postWithAuthor
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content, imageUrl } = req.body;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: 'Le post est instrouvable' });
      }

      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'Vous ne pouvez modifier que vos propres publications.' });
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
        message: 'Post mis à jour avec succès',
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
        return res.status(404).json({ error: 'Le post est instrouvable' });
      }

      // Check if user owns the post
      if (post.userId !== req.user.id) {
        return res.status(403).json({ error: 'Vous ne pouvez supprimer que vos propres publications.' });
      }

      await post.destroy();

      res.json({ message: 'Post supprimé avec succès' });
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
