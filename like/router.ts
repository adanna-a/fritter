import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as likeValidator from '../like/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get likes by author.
 * 
 * @name GET /api/likes?author=USERNAME
 * 
 * @return {LikeResponse[]} - An array of likes given by user with id userId
 * @throws {404} - If userId is not given
 * @throws {404} - If no user has given userId
 * 
 */
/**
 * Get likes by freet
 * 
 * @name GET /api/likes?freetId=FREET
 * 
 * @return {{'rank': number, 'likes': LikeResponse[]} - An array of likes associated with freet with if freetId}
 * @throws {404} - If freetId not given
 * @throws {404} - If no freet has given freetId
 * 
 */
router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {

      if (req.query.author !== undefined) next();
      else if (req.query.freetId !== undefined) next('route');
    },
    [
      userValidator.isAuthorExists
    ],
    async (req: Request, res: Response, next: NextFunction) => {
      const userLikes = await LikeCollection.findAllByUsername(req.query.author as string);
      const response = userLikes.map(util.constructLikeResponse);
      res.status(200).json(response);
    } 
);
router.get(
  '/',
  [freetValidator.isFreetQueryExists],
  async (req: Request, res: Response) => {

    const freetLikes = await LikeCollection.findAllByFreetId(req.query.freetId as string);
    const rank = freetLikes.length;
    const response = {'rank': rank, 'likes': freetLikes.map(util.constructLikeResponse)};
    res.status(200).json(response);
  },
)
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
      likeValidator.notLiked,
    ],
    async (req: Request, res: Response) => {
      const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      const like = await LikeCollection.addOne(userId, req.body.id);
  
      res.status(201).json({
        message: 'Your like was created successfully.',
        like: util.constructLikeResponse(like)
      });
    }
  );

  /**
 * Delete a like
 *
 * @name DELETE /api/likes/:freetId
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
      await LikeCollection.deleteOne(userId, req.params.freetId);
      res.status(200).json({
        message: 'Your like was deleted successfully.'
      });
    }
  );

  export {router as likeRouter};
