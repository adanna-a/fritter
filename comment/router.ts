import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import CommentCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as commentValidator from '../comment/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the comments
 *
 * @name GET /api/comments
 *
 * @return {CommentResponse[]} - A list of all the comments sorted in descending
 *                      order by date created
 */
/**
 * Get freets by author.
 *
 * @name GET /api/comments?authorId=id
 *
 * @return {CommentResponse[]} - An array of freets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
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
  
      const allComments = await CommentCollection.findAll();
      const response = allComments.map(util.constructCommentResponse);
      res.status(200).json(response);
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
  
  /**
   * Get comments by freet.
   *
   * @name GET /api/comments?freetId=id
   *
   * @return {FreetResponse[]} - An array of comments associated with freet id, freetId
   * 
   */
  router.get(
    '/',
    [freetValidator.isFreetQueryExists],
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.freetId !== undefined) {
        next();
        return;
      }
      const freetComments = await CommentCollection.findAllByFreet(req.query.country as string);
      
      if (freetComments.length > 0) {
        const response = freetComments.map(util.constructCommentResponse);
        res.status(200).json(response);
      } else {
        const response = `There are no comments associated with this freet ${req.query.country}.`
        res.status(200).json(response);
      } 
    },
  )

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
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      commentValidator.isValidCommentContent
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
   * Delete a comment
   *
   * @name DELETE /api/comments/:id
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
