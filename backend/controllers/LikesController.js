const { Like, User, Post, Comment } = require('../models');

class LikesController {
  static async togglePostLike(req, res) {
    try {
      const { postId } = req.params;
      const userId = req.user.id;

      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const existingLike = await Like.findOne({
        where: { userId, postId }
      });

      if (existingLike) {
        await existingLike.destroy();
        res.json({ message: 'Post retiré des favoris avec succès', liked: false });
      } else {
        await Like.create({ userId, postId });
        res.json({ message: 'Post ajouté aux favoris avec succès', liked: true });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async toggleCommentLike(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;

      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      const existingLike = await Like.findOne({
        where: { userId, commentId }
      });

      if (existingLike) {
        await existingLike.destroy();
        res.json({ message: 'Commentaire retiré des favoris avec succès', liked: false });
      } else {
        await Like.create({ userId, commentId });
        res.json({ message: 'Commentaire ajouté aux favoris avec succès', liked: true });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

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
