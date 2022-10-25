import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FolloweeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Follow user for a specific feed
 * 
 * @name POST /api/followees
 * 
 * @param {string} feedName - The name of the feed
 * @param {string} followeeUsername - The username of the user being followed
 * @return {FolloweeResponse}
 * @throws
 */
router.post(
  '/',
  [

  ],
  async (req: Request, res: Response) => {
    const authorId = (req.session.userId as string) ?? '';
    const followee = await FolloweeCollection.addOne(authorId, req.body.followeeUsername, req.body.feedName);

    res.status(201).json({
        message: `You followed user ${req.body.followeeUsername} on the feed, ${req.body.feedName}, successfully.`,
        followee: util.constructFolloweeResponse(followee)
    });
  }
);

/**
 * Unfollow user for a specific feed
 * 
 * @name DELETE /api/followees/:id
 * 
 * @return {string} - A success message
 * @throws
 */
router.delete(
  '/:followeeId?',
  [],
  async (req: Request, res: Response) => {
    await FolloweeCollection.deleteOne(req.params.followeeId);
    res.status(200).json({
      message: 'You unfollowed the user from this feed successfully.'
    });
  }
);

/**
 * Delete user's feed
 * 
 * @name DELETE /api/followees?feedName=NAME
 * 
 * @return {string} - A success message
 * @throws
 */
router.delete(
    '/', 
    [],
    async (req: Request, res: Response) => {
        const authorId = (req.session.userId as string) ?? '';
        await FolloweeCollection.deleteSome(authorId, req.query.feedName as string);
        res.status(200).json({
            message: 'You deleted your feed successfully.'
          });
    }
);

/**
 * Get all followees on a user's feed
 * 
 * @name GET /api/followees?feedName=NAME
 * 
 * @return {FolloweesResponse[]} - An array of followees that the user followed on a specific feed
 * @throws 
 */
/**
 * Get all followees 
 */
router.get(
  '/',
  async (req: Request, res: Response) => {
    const authorId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const followees = await FolloweeCollection.findAllByFeedName(authorId, req.query.feedName as string)
    const response = followees.map(util.constructFolloweeResponse);
    res.status(200).json(response);
  }
)