const { Comment, User, Post, Like } = require('../models');

class CommentsController {
  static async createComment(req, res) {
    try {
      const { content, postId } = req.body;

      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const comment = await Comment.create({
        content,
        postId,
        userId: req.user.id
      });

      const commentWithAuthor = await Comment.findByPk(comment.id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.status(201).json({
        message: 'Commentaire créé avec succès',
        comment: commentWithAuthor
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getPostComments(req, res) {
    try {
      const { postId } = req.params;

      const comments = await Comment.findAll({
        where: { postId },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
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
        order: [['createdAt', 'ASC']]
      });

      res.json({ comments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only edit your own comments' });
      }

      await comment.update({ content });

      const updatedComment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          }
        ]
      });

      res.json({
        message: 'Commentaire mis à jour avec succès',
        comment: updatedComment
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      if (comment.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own comments' });
      }

      await comment.destroy();

      res.json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'firstName', 'lastName', 'profilePicture']
          },
          {
            model: Post,
            as: 'post',
            attributes: ['id', 'title']
          },
          {
            model: Like,
            as: 'likes'
          }
        ]
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      res.json({ comment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CommentsController;
