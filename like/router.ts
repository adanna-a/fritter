import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as likeValidator from '../like/middleware';
import * as util from './util';

const router = express.Router();

/*
 * Get likes by author.
 * 
 * @name GET /api/likes?userId=id
 * 
 * @return {LikeResponse[]} - An array of likes given by user with id userId
 * @throws {404} - If userId is not given
 * @throws {404} - If no user has given userId
 * 
 */
router.get(
    '/',
    [
        userValidator.isAuthorExists
    ],
    async (req: Request, res: Response) => {

        const userLikes = await LikeCollection.findAllByUsername(req.query.author as string);
        const response = userLikes.map(util.constructLikeResponse);
        res.status(200).json(response);
    }
);

/**
 * Add a new like.
 *
 * @name POST /api/likes
 *
 * @param {freetId} - The freetId of the freet that the user likes
 * @return {LikeResponse} - The created freet
 * @throws {404} - If freetId is invalid
 * @throws {403} - If user is not logged in
 * @throws {403} - If user has liked the freet
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      freetValidator.isFreetExists,
      likeValidator.notLiked,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const like = await LikeCollection.addOne(userId, req.body.freetId);
  
      res.status(201).json({
        message: 'Your like was created successfully.',
        like: util.constructLikeResponse(like)
      });
    }
  );

  /**
 * Delete a like
 *
 * @name DELETE /api/like/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
    '/:freetId?',
    [
      userValidator.isUserLoggedIn,
      freetValidator.isFreetExists,
      likeValidator.isLiked,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      await LikeCollection.deleteOne(userId, req.params.freetId | string);
      res.status(200).json({
        message: 'Your like was deleted successfully.'
      });
    }
  );

  export {router as likeRouter};
