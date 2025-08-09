const { Like, User, Post, Comment } = require('../models');

class LikesController {
  // Toggle like on a post
  static async togglePostLike(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      // Check if post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if like already exists
      const existingLike = await Like.findOne({
        where: { userId, postId }
      });

      if (existingLike) {
        // Unlike the post
        await existingLike.destroy();
        res.json({ message: 'Post retiré des favoris avec succès', liked: false });
      } else {
        // Like the post
        await Like.create({ userId, postId });
        res.json({ message: 'Post ajouté aux favoris avec succès', liked: true });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Toggle like on a comment
  static async toggleCommentLike(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      // Check if comment exists
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if like already exists
      const existingLike = await Like.findOne({
        where: { userId, commentId }
      });

      if (existingLike) {
        // Unlike the comment
        await existingLike.destroy();
        res.json({ message: 'Commentaire retiré des favoris avec succès', liked: false });
      } else {
        // Like the comment
        await Like.create({ userId, commentId });
        res.json({ message: 'Commentaire ajouté aux favoris avec succès', liked: true });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get likes for a post
  static async getPostLikes(req, res) {
    try {
      const { postId } = req.params;

      const likes = await Like.findAll({
        where: { postId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.json({ 
        likes,
        count: likes.length 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get likes for a comment
  static async getCommentLikes(req, res) {
    try {
      const { commentId } = req.params;

      const likes = await Like.findAll({
        where: { commentId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.json({ 
        likes,
        count: likes.length 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Check if user has liked a post
  static async checkPostLike(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      const like = await Like.findOne({
        where: { userId, postId }
      });

      res.json({ liked: !!like });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Check if user has liked a comment
  static async checkCommentLike(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      const like = await Like.findOne({
        where: { userId, commentId }
      });

      res.json({ liked: !!like });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = LikesController;
