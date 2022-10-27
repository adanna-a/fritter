import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CommentCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as commentValidator from '../comment/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new comment.
 *
 * @name POST /api/comments
 *
 * @param {string} content - The content of the comment
 * @param {string} freetId - The id of the freet being commented on 
 * @return {CommentResponse} - The created comment
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the comment content is empty or a stream of empty spaces
 * @throws {413} - If the comment content is more than 140 characters long
 * @throws {400} - If freetId is not given
 * @throws {404} - If the freetId is invalid
 */
 router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    commentValidator.isValidCommentContent,
    freetValidator.isFreetBodyExists
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const comment = await CommentCollection.addOne(userId, req.body.id, req.body.content);

    res.status(201).json({
      message: 'Your comment was created successfully.',
      comment: util.constructCommentResponse(comment)
    });
  }
);

/**
 * Get all the comments made by an author.
 *
 * @name GET /api/comments?author=USERNAME
 *
 * @return {CommentResponse[]} - An array of comments made by user with username, author
 * @throws {400} - If author is not given
 * @throws {404} - If author is not a recognized username of any user
 */
/**
 * Get comments made on a specific fsreet.
 *
 * @name GET /api/comments?freetId=FREET
 *
 * @return {CommentResponse[]} - An array of comments made towards freet with freetId 
 * @throws {400} - If freetId is not given
 * @throws {404} - If the freetId is invalid
 *
 */
 router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      // Check if authorId query parameter was supplied
      if (req.query.author !== undefined) {
        next();
        return;
      } 
      if (req.query.freet !== undefined) {
        next('route');
        return;
      }
    },
    [
      userValidator.isAuthorExists
    ],
    async (req: Request, res: Response) => {
      const authorFreets = await CommentCollection.findAllByUsername(req.query.author as string);
      const response = authorFreets.map(util.constructCommentResponse);
      res.status(200).json(response);
    }
  );
  router.get(
    '/',
    [freetValidator.isFreetQueryExists],
    async (req: Request, res: Response, next: NextFunction) => {
      const freetComments = await CommentCollection.findAllByFreet(req.query.freetId as string);
      const response = freetComments.map(util.constructCommentResponse);
      res.status(200).json(response);
    }
  )
  
  /**
   * Delete a comment
   *
   * @name DELETE /api/comments/:commentId
   *
   * @return {string} - A success message
   * @throws {403} - If the user is not logged in or is not the author of
   *                 the commentId
   * @throws {404} - If the commentId is not valid
   */
  router.delete(
    '/:commentId?',
    [
      userValidator.isUserLoggedIn,
      commentValidator.isCommentExists,
      commentValidator.isValidCommentModifier
    ],
    async (req: Request, res: Response) => {
      await CommentCollection.deleteOne(req.params.freetId);
      res.status(200).json({
        message: 'Your comment was deleted successfully.'
      });
    }
  );
export {router as commentRouter};
