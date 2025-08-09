const { Comment, User, Post, Like } = require('../models');

class CommentsController {
  // Create new comment
  static async createComment(req, res) {
    try {
      const { content, postId } = req.body;

      // Check if post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const comment = await Comment.create({
        content,
        postId,
        userId: req.user.id
      });

      // Fetch the comment with author information
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
        message: 'Comment created successfully',
        comment: commentWithAuthor
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get comments for a post
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

  // Update comment
  static async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if user owns the comment
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
        message: 'Comment updated successfully',
        comment: updatedComment
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete comment
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if user owns the comment
      if (comment.userId !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own comments' });
      }

      await comment.destroy();

      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get single comment
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
